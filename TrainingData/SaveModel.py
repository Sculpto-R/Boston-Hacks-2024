import torch
import torch.nn as nn
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
from tqdm import tqdm  # Import tqdm for progress bar

# Define the model class (same as during training)
class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=1)
        self.fc1 = nn.Linear(32 * 50 * 50, 128)
        self.fc2 = nn.Linear(128, 9)  # 9 classes for 9 shapes

    def forward(self, x):
        x = torch.relu(self.conv1(x))
        x = torch.max_pool2d(x, 2)
        x = torch.relu(self.conv2(x))
        x = torch.max_pool2d(x, 2)
        x = x.view(-1, 32 * 50 * 50)  # Flatten
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Instantiate the model
model = SimpleCNN()

# Load the model weights from a specific epoch, e.g., epoch 1
model.load_state_dict(torch.load("cnn_model_epoch_1.pth", weights_only=True))
model.eval()  # Set the model to evaluation mode

# Define transformations
transform = transforms.Compose([
    transforms.Resize((200, 200)),
    transforms.ToTensor(),
])

# Load test dataset
test_dataset = datasets.ImageFolder(root="2D geometric shapes dataset/output", transform=transform)
test_loader = DataLoader(test_dataset, batch_size=32, shuffle=False)

correct = 0
total = 0

with torch.no_grad():  # No need to calculate gradients during evaluation
    for images, labels in tqdm(test_loader, desc="Evaluating", unit="batch"):
        outputs = model(images)
        _, predicted = torch.max(outputs.data, 1)
        total += labels.size(0)
        correct += (predicted == labels).sum().item()

accuracy = correct / total * 100
print(f'Accuracy of the model from epoch 1 on test data: {accuracy:.2f}%')
