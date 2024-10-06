import asyncio
import base64
import functools

import numpy as np
import cv2
import io, base64

from concurrent.futures import ThreadPoolExecutor
from PIL import Image

from pprint import pprint
import generate_environment

from time import time
from transport import WebTransport
from components_processing import *

components = []
last_frame = None
listen_freq = 1
last_frame_time = 0

active_listen = False

component_executor = ThreadPoolExecutor()
frame_executor = ThreadPoolExecutor()


def find_component_by_id(component_id):
    for component in components:
        if component.id == component_id:
            return component
    return None


def base64_to_cv2(base64_str):
    # Decode base64 string to bytes
    img = Image.open(io.BytesIO(base64.decodebytes(bytes(base64_str.split('data:image/png;base64')[1], "utf-8"))))

    image_np = np.array(img)

    # Step 2: Convert RGB to BGR
    img = cv2.cvtColor(image_np, cv2.COLOR_RGB2BGR)

    return img

def get_player_position():
    for component in components:
        if isinstance(component, MovementComponent):
            return component.entity_x, component.entity_y
    return None, None

def get_obstacles():
    obstacles = []
    for component in components:
        if isinstance(component, SpriteComponent):
            if component.context == 'obstacles':
                obstacles.append(component.last_observation)
    return obstacles

def calculate_distance(x1, y1, x2, y2):
    return np.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)

def get_obstacle_distance():
    def squash_obstacle_lists(obstacles):
        return [obstacle for sublist in obstacles for obstacle in sublist]

    player_x, player_y = get_player_position()
    obstacles = get_obstacles()
    nearest_obstacle = 100000

    if len(obstacles) == 0 or len(obstacles[0]) == 0 or player_x is None:
        return 0

    try:
        tmp_obstacles = squash_obstacle_lists(obstacles)
        obstacles = tmp_obstacles
    except:
        pass

    for obstacle in obstacles:
        obstacle = obstacle[0]
        obstacle_x, obstacle_y = obstacle[0], obstacle[1]
        if obstacle_x < player_x:
            continue

        distance = obstacle_x - player_x
        if distance < nearest_obstacle:
            nearest_obstacle = distance

    return nearest_obstacle

def process_components():
    for component in components:
        min_crop_x = 0
        min_crop_y = 0
        max_crop_x = last_frame.shape[1]
        max_crop_y = last_frame.shape[0]

        start_crop_x = 0#int(max(min_crop_x, component.x))
        start_crop_y = 0#int(max(min_crop_y, component.y))

        end_crop_x = int(min(1199, component.x + component.width))
        end_crop_y = int(min(299, component.y + component.height))

        cropped_frame = last_frame[start_crop_y:end_crop_y, start_crop_x:end_crop_x]
        cv2.imwrite("cropped_frame.png", cropped_frame)
        print(component.process(cropped_frame))


def collect_frame(data, timestamp):
    global last_frame, last_frame_time
    current_time = time()

    if current_time - last_frame_time < listen_freq:
        return
 
    last_frame = base64_to_cv2(data)
    process_components()
    print("OBSTACLE DISTANCE: ", get_obstacle_distance())
    last_frame_time = current_time



async def add_or_update_component(component, timestamp):
    existing_component = find_component_by_id(component['id'])

    x = max(min(1200, component['zone']['x']), 0)
    y = max(min(300, component['zone']['y']), 0)
    width = max(min(1200, component['zone']['width']), 0) * 2
    height = max(min(300, component['zone']['height']), 0) * 2

    if not existing_component:
        if component['kind'] == 'ocr':
            new_component = OCRComponent(component['id'], x, y,
                                         width, height, component['context'])
            components.append(new_component)
        elif component['kind'] == 'sprite':
            new_component = SpriteComponent(component['id'], x, y,
                                            width, height,
                                            component['context'], ['cactus', 'bird', 'other'])
            components.append(new_component)
        elif component['kind'] == 'movement':
            new_component = MovementComponent(component['id'], x, y,
                                              width, height,
                                              component['context'], 'player')
            components.append(new_component)
    else:
        existing_component.edit(x, y, width,
                                height, component['context'])


async def main():
    transport = WebTransport()

    async def handle_stop_gameplay(timestamp: int):
        code = generate_environment.create_gym_env_from_message(transport.frames, transport.keyboard_events)
        print("Environment built")
        await transport.send_code(code)


    async def handle_components_update(component, timestamp):
        await add_or_update_component(component, timestamp)


    async def handle_regular_frame(data, timestamp):

        # Use run_in_executor to run the blocking call in a separate thread
        await asyncio.get_event_loop().run_in_executor(
            frame_executor,
            functools.partial(collect_frame, data, timestamp)
        )

    transport.on('stop_gameplay', handle_stop_gameplay)
    transport.on('component_update', handle_components_update)
    transport.on('game_frame', handle_regular_frame)
    await transport.start_server('localhost', 8765)


if __name__ == "__main__":
    asyncio.run(main())
