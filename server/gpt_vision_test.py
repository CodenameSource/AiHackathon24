import cv2
import os
import base64
from openai import OpenAI
import dotenv
import os

dotenv.load_dotenv()


def extract_frames(video_path, frame_interval, output_dir):
    cap = cv2.VideoCapture(video_path)
    frames = []
    frame_count = 0

    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_count % frame_interval == 0:
            frame_path = os.path.join(output_dir, f"frame_{frame_count}.jpg")
            cv2.imwrite(frame_path, frame)
            frames.append(frame_path)
        
        frame_count += 1

    cap.release()
    return frames

def encode_image_to_base64(image_path):
    with open(image_path, "rb") as image_file:
        return base64.b64encode(image_file.read()).decode('utf-8')

def analyze_frames_with_gpt_vision(frames):
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    messages = [
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "You are a reinforcemnt learning expert. This is a gameplay from a 2d game. Explain me what is the purpose of the game - all observations, actions and reward functions. The response should be in a form that is the most meaningful to a LLM for generating a code that will make the environment. Then Your task is to create an accurate and good gym environment for 2d game using the knowledge extracted from the gameplay. Please write Python code",
                }
            ],
        }
    ]

    for frame_path in frames:
        image_base64 = encode_image_to_base64(frame_path)
        messages[0]["content"].append(
            {
                "type": "image_url",
                "image_url": {
                    "url": f"data:image/jpeg;base64,{image_base64}",
                },
            }
        )

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=messages,
        max_tokens=1500,
    )
    return response

def main():
    video_path = "/Users/flychuban/Downloads/dino_test_video.mkv"
    frame_interval = 150  # Adjust the frame interval as needed
    output_dir = "extracted_images"

    frames = extract_frames(video_path, frame_interval, output_dir)
    response = analyze_frames_with_gpt_vision(frames)
    final_message = response.choices[0].message.content
    print("!!! FINAL MESSAGE !!!")
    print(final_message)

if __name__ == "__main__":
    main()
