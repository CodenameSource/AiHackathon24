from openai import OpenAI
import dotenv
import os

dotenv.load_dotenv()

def review_gym_environment_code(environment_code):
    client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])

    # Define the prompt for GPT-4
    prompt = f"""
    I have written a custom reinforcement learning (RL) environment using OpenAI Gym. Below is the complete code for the environment:

    ```python
    {environment_code}
    ```

    Please review this code and fix if necessary based on the following points:
    1. Errors or bugs in the code.
    2. Code quality and readability.

    Return only the fixed code with necessary comments or modifications. Thank you!
    """

    messages = [
        {
            "role": "system",
            "content": [
                {
                    "type": "text",
                    "text": "Your task is to review the following custom reinforcement learning (RL) environment code and fix any errors or bugs. Please ensure the code quality and readability are good. Return only the fixed code with necessary comments or modifications. Thank you!",
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

    try:
        # Send the prompt to GPT-4
        response = client.chat.completions.create(
            model="gpt-4",
            max_tokens=3000,
            temperature=0.15,
            messages=messages,
        )

        final_message = response.choices[0].message.content
        return acquire_code(final_message)

    except Exception as e:
        return f"An error occurred: {e}"

def acquire_code(response):
    code = response.split("```")[1].strip()
    return code


# Example usage
if __name__ == "__main__":
    environment_code = """
import gym
from gym import spaces
import numpy as np

class CustomGridEnv(gym.Env):
    def __init__(self):
        super(CustomGridEnv, self).__init__()
        self.grid_size = 5
        self.observation_space = spaces.Box(low=0, high=self.grid_size-1, shape=(2,), dtype=np.int32)
        self.action_space = spaces.Discrete(4)
        self.state = None
        self.goal_position = (self.grid_size-1, self.grid_size-1)
        self.obstacle_positions = [(1, 1), (2, 2), (3, 3)]

    def reset(self):
        self.state = (0, 0)
        return np.array(self.state)

    def step(self, action):
        x, y = self.state
        if action == 0:  # Up
            y = max(0, y - 1)
        elif action == 1:  # Down
            y = min(self.grid_size - 1, y + 1)
        elif action == 2:  # Left
            x = max(0, x - 1)
        elif action == 3:  # Right
            x = min(self.grid_size - 1, x + 1)

        self.state = (x, y)
        done = self.state == self.goal_position
        reward = 10 if done else -1
        if self.state in self.obstacle_positions:
            reward = -10
            done = True
        return np.array(self.state), reward, done, {}

    def render(self, mode='human'):
        grid = np.zeros((self.grid_size, self.grid_size), dtype=str)
        grid[self.goal_position] = 'G'
        for pos in self.obstacle_positions:
            grid[pos] = 'X'
        grid[self.state] = 'A'
        print(grid)
    """

    review = review_gym_environment_code(environment_code)
    print("Review from GPT-4:\n", review)
