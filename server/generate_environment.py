from openai import OpenAI
import os
from analyze_frames import get_knowledge_from_images
from dotenv import load_dotenv

load_dotenv()

def save_env_code(generated_code):
    with open('CustomEnv.py', 'w') as file:
        file.write(generated_code)

def create_gym_env_from_message(all_frames):
    # Set your OpenAI API key here or use an environment variable
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])


    # Define the context and prompt
    context = """
    You are a reinforcemnt learning expert. Your task is to create an accurate and good gym environment for 2d game using the knowledge extracted from the gameplay. Please write ONLY the Python code that is creating the environment. The environment should be defined in a typical way that is used in OpenAI Gym. The class must be named CustomEnv every time.
    """

    prompt = get_knowledge_from_images(all_frames)


    messages = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": context,
                }
            ]
        },
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": prompt,
                }
            ],
        }
    ]

    # Call the OpenAI API to generate the response
    response = client.chat.completions.create(
        model="gpt-4o",
        max_tokens=3000,
        temperature=0.1,
        messages=messages,
    )

    final_message = response.choices[0].message.content
    front_idx = final_message.find("```")
    back_idx = final_message.rfind("```")
    generated_code = final_message[front_idx+9:back_idx] # + 9 because ``` and python
    save_env_code(generated_code)
    
    return generated_code