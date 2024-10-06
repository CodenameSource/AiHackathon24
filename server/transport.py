import asyncio
from pprint import pprint
import websockets
import json
import time
from typing import Dict, Any, Callable, Union, Coroutine, List, Tuple

class WebTransport:
    def __init__(self):
        self.components: Dict[str, Dict[str, Any]] = {}
        self.event_handlers: Dict[str, Union[Callable, Coroutine]] = {}
        self.is_gameplay_running: bool = False
        self.frames: List[Tuple[int, str]] = []  # Store frames with timestamps in milliseconds
        self.keyboard_events: List[Tuple[int, Dict[str, Any]]] = []

    async def handle_connection(self, websocket, path):
        try:
            async for message in websocket:
                await self.process_message(message)
        except websockets.exceptions.ConnectionClosed:
            pass

    async def process_message(self, message: str):
        data = json.loads(message)
        event_type = data.get('type')
        timestamp = data.get('timestamp', int(time.time()) * 1000)  # Use provided timestamp or current time in milliseconds

        if event_type == 'game_frame':
            await self.handle_game_frame(data, timestamp)
        elif event_type == 'component_update':
            await self.handle_component_update(data, timestamp)
        elif event_type == 'user_event':
            await self.handle_user_event(data, timestamp)
        elif event_type == 'remove_component':
            await self.handle_remove_component(data, timestamp)
        elif event_type == 'keyboard_event':
            await self.handle_keyboard_event(data, timestamp)
        elif event_type == 'start_gameplay':
            await self.handle_start_gameplay(timestamp)
        elif event_type == 'stop_gameplay':
            await self.handle_stop_gameplay(timestamp)
        else:
            print(f"Unknown event type: {event_type}")

    async def handle_start_gameplay(self, timestamp: int):
        self.is_gameplay_running = True
        self.frames.clear()  # Clear the frames array when gameplay starts
        self.keyboard_events.clear()
        print(f"Gameplay started at {timestamp} ms")
        if 'start_gameplay' in self.event_handlers:
            await self.call_handler('start_gameplay', timestamp)

    async def handle_stop_gameplay(self, timestamp: int):
        self.is_gameplay_running = False
        print(f"Gameplay stopped at {timestamp} ms")
        if 'stop_gameplay' in self.event_handlers:
            await self.call_handler('stop_gameplay', timestamp)

    async def handle_game_frame(self, data: Dict[str, Any], timestamp: int):
        if not self.is_gameplay_running:
            return  # Don't process game frames if gameplay is not running
        
        payload = data.get('payload')
        self.frames.append((timestamp, payload))  # Store the frame with timestamp
        print(f"Stored frame at {timestamp} ms. Total frames: {len(self.frames)}")
        
        if 'game_frame' in self.event_handlers:
            await self.call_handler('game_frame', payload, timestamp)

    async def handle_component_update(self, data: Dict[str, Any], timestamp: int):
        component = data.get('component', {})
        component_id = component.get('id')
        
        if component_id:
            self.components[component_id] = component

        pprint(self.components)

        if 'component_update' in self.event_handlers:
            await self.call_handler('component_update', component, timestamp)

    async def handle_user_event(self, data: Dict[str, Any], timestamp: int):
        user_event = data.get('event', {})
        
        if 'user_event' in self.event_handlers:
            await self.call_handler('user_event', user_event, timestamp)

    async def handle_remove_component(self, data: Dict[str, Any], timestamp: int):
        component_id = data.get('component_id')
        if component_id in self.components:
            del self.components[component_id]
            print(f"Removed component with ID: {component_id}")
        else:
            print(f"Component with ID {component_id} not found")

        if 'remove_component' in self.event_handlers:
            await self.call_handler('remove_component', component_id, timestamp)

    async def handle_keyboard_event(self, data: Dict[str, Any], timestamp: int):
        keyboard_event = data.get('event', {})
        print(f"Keyboard event received on server: {json.dumps(keyboard_event, indent=2)}")
        self.keyboard_events.append((timestamp, keyboard_event))
        if 'keyboard_event' in self.event_handlers:
            await self.call_handler('keyboard_event', keyboard_event, timestamp)

    async def call_handler(self, event_type: str, *args):
        handler = self.event_handlers[event_type]
        if asyncio.iscoroutinefunction(handler):
            await handler(*args)
        else:
            handler(*args)

    def on(self, event_type: str, handler: Union[Callable, Coroutine]):
        self.event_handlers[event_type] = handler

    async def start_server(self, host: str, port: int):
        allowed_origins = [
            'http://localhost:3000',
            'https://ai-hackathon-gym-environments.vercel.app'
        ]
        server = await websockets.serve(
            self.handle_connection, 
            host, 
            port, 
            origins=allowed_origins
        )
        print(f"WebSocket server started on ws://{host}:{port}")
        print(f"Allowed origins: {', '.join(allowed_origins)}")
        await server.wait_closed()