from imitation_learning import train_imitation_model
import torch
from stable_baselines3 import PPO
from stable_baselines3.common.vec_env import DummyVecEnv
from stable_baselines3.common.evaluation import evaluate_policy
import importlib


# Convert pre-trained imitation model to a policy
class PretrainedPolicyWrapper:
    def __init__(self, imitation_model):
        self.imitation_model = imitation_model

    def predict(self, obs):
        with torch.no_grad():
            obs_tensor = torch.tensor(obs, dtype=torch.float32)
            logits = self.imitation_model(obs_tensor)
            action = logits.argmax().item()  # Take the action with the highest probability
        return action, None  # The second value is for consistency with Stable-Baselines3



def train_rl_model(gameplay_data, state_dim, action_dim):
    # Pretrain the imitation model using your gameplay data
    pretrained_model = train_imitation_model(gameplay_data, state_dim, action_dim)

    # Use pre-trained weights as initialization for PPO
    pretrained_policy = PretrainedPolicyWrapper(pretrained_model)

    # Create your environment
    custom_env_file = importlib.import_module("CustomEnv.py")
    env = DummyVecEnv([lambda: custom_env_file.CustomEnv()])

    # Fine-tune the model using PPO
    ppo_model = PPO("MlpPolicy", env, verbose=1)
    ppo_model.policy = pretrained_policy  # Initialize PPO with pretrained policy
    ppo_model.learn(total_timesteps=50000)

    # Save the fine-tuned model
    ppo_model.save("ppo_dino_finetuned")

    state_dim = env.observation_space.shape[0]  # For a vector-based observation
    action_dim = env.action_space.n 