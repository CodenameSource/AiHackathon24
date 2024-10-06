import cv2
import os
import base64
from openai import OpenAI
import dotenv
import os

dotenv.load_dotenv()

FRAME_INTERVAL = 150

def extract_frames(all_frames, frame_interval):
    frames = []
    frame_count = 0

    for frame in all_frames:
        if frame_count % frame_interval == 0:
            frames.append(frame)
        frame_count += 1
        
    return frames


def analyze_frames_with_gpt_vision(frames):
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "You are a reinforcemnt learning expert. This is a gameplay from a 2d game. Explain me what is the purpose of the game - all observations, actions and reward functions. The response should be in a form that is the most meaningful to a LLM for generating a code that will make the environment. Please give me the labels for the obstacles in the end. Answer structure should be like this:- 1.General description, 2.Action space description, 3.Observation space description, 4. Reward function description, 5. Obstacle label",
                }
            ],
        }
    ]

    for frame in frames:
        messages[0]["content"].append(
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{frame}",
                },
            }
        )

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=messages,
        max_tokens=1500,
        temperature=0.15,
    )
    return response

def get_knowledge_from_images(all_frames):
    frames = extract_frames(all_frames, FRAME_INTERVAL)
    response = analyze_frames_with_gpt_vision(frames)
    final_message = response.choices[0].message.content
    return final_message
