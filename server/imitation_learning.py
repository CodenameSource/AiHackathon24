import torch
import torch.nn as nn
import torch.optim as optim
import json
from torch.utils.data import DataLoader, Dataset

class GameplayDataset(Dataset):
    def __init__(self, gameplay_data):
        self.gameplay_data = gameplay_data  # List of (state, action) pairs

    def __len__(self):
        return len(self.gameplay_data)

    def __getitem__(self, idx):
        state, action = self.gameplay_data[idx]
        return torch.tensor(state, dtype=torch.float32), torch.tensor(action, dtype=torch.long)

    def save(self, gameplay_data_file):
        with open(gameplay_data_file, 'w') as f:
            json.dump(self.gameplay_data, f)

    def load(self, gameplay_data_file):
        with open(gameplay_data_file, 'r') as f:
            gameplay_data = json.load(f)


# Neural network for behavior cloning
class ImitationPolicy(nn.Module):
    def __init__(self, state_dim, action_dim):
        super(ImitationPolicy, self).__init__()
        self.fc = nn.Sequential(
            nn.Linear(state_dim, 128),
            nn.ReLU(),
            nn.Linear(128, 64),
            nn.ReLU(),
            nn.Linear(64, action_dim)
        )

    def forward(self, x):
        return self.fc(x)

# Example: Pretrain the model using imitation learning (supervised learning)
def train_imitation_model(gameplay_data, state_dim, action_dim, epochs=10, batch_size=64, lr=0.001):
    dataset = GameplayDataset(gameplay_data)
    dataloader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

    # Initialize imitation model
    model = ImitationPolicy(state_dim, action_dim)
    optimizer = optim.Adam(model.parameters(), lr=lr)
    loss_fn = nn.CrossEntropyLoss()

    # Training loop
    for epoch in range(epochs):
        model.train()
        running_loss = 0.0
        for states, actions in dataloader:
            optimizer.zero_grad()
            outputs = model(states)
            loss = loss_fn(outputs, actions)
            loss.backward()
            optimizer.step()
            running_loss += loss.item()
        print(f"Epoch {epoch+1}, Loss: {running_loss / len(dataloader)}")

    return model
