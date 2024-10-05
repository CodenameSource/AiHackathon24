import uuid
import requests
import cv2
import torch
from transformers import LlavaNextVideoProcessor, LlavaNextVideoForConditionalGeneration
from PIL import Image

device = 'mps'
model_id = "llava-hf/LLaVA-NeXT-Video-7B-hf"

model = LlavaNextVideoForConditionalGeneration.from_pretrained(
    model_id,
    torch_dtype=torch.float16,
    low_cpu_mem_usage=True,
).to(device)

processor = LlavaNextVideoProcessor.from_pretrained(model_id)

def sample_frames(url, num_frames):
    response = requests.get(url)
    path_id = str(uuid.uuid4())

    path = f"./{path_id}.mp4"

    with open(path, "wb") as f:
         f.write(response.content)

    video = cv2.VideoCapture(path)
    total_frames = int(video.get(cv2.CAP_PROP_FRAME_COUNT))
    interval = total_frames // num_frames
    frames = []
    for i in range(total_frames):
        ret, frame = video.read()
        if not ret:
            continue
        if i % interval == 0:
            pil_img = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
            frames.append(pil_img)
    video.release()
    return frames

conversation = [
    {

        "role": "user",
        "content": [
            {"type": "text", "text": "This is a gameplay from a 2d game. Explain me what is the purpose of the game - all observations, actions and reward functions."},
            {"type": "video"},
            ],
    },
]

prompt = processor.apply_chat_template(conversation, add_generation_prompt=True)

video_url = "/Users/flychuban/Downloads/2024-10-05\17-10-07.mkv"
video = sample_frames(video_url, 100)

inputs = processor(text=prompt, videos=video, padding=True, return_tensors="pt").to(model.device)

output = model.generate(**inputs, max_new_tokens=100, do_sample=False)
print(processor.decode(output[0][2:], skip_special_tokens=True))