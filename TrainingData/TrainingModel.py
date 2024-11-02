from tqdm import tqdm  # Import tqdm for the progress bar
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import torch
import torch.nn as nn
import torch.optim as optim

# Define data transformations
transform = transforms.Compose([
    transforms.Resize((200, 200)),     # Resize to 200x200
    transforms.ToTensor(),             # Convert to tensor
])

# Load the dataset
dataset_path = 'TrainingData/2D geometric shapes dataset/output'
dataset = datasets.ImageFolder(root=dataset_path, transform=transform)

# Create DataLoader
batch_size = 32
data_loader = DataLoader(dataset, batch_size=batch_size, shuffle=True)

# Define your model (example using a simple CNN)
class SimpleCNN(nn.Module):
    def __init__(self):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 16, kernel_size=3, stride=1, padding=1)
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, stride=1, padding=1)
        self.fc1 = nn.Linear(32 * 50 * 50, 128)  # Adjust dimensions as necessary
        self.fc2 = nn.Linear(128, 9)             # 9 classes for 9 shapes

    def forward(self, x):
        x = torch.relu(self.conv1(x))
        x = torch.max_pool2d(x, 2)
        x = torch.relu(self.conv2(x))
        x = torch.max_pool2d(x, 2)
        x = x.view(-1, 32 * 50 * 50)            # Flatten
        x = torch.relu(self.fc1(x))
        x = self.fc2(x)
        return x

# Instantiate the model, loss function, and optimizer
model = SimpleCNN()
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Training loop
num_epochs = 5
for epoch in range(num_epochs):
    running_loss = 0.0
    # Wrap data_loader with tqdm to show progress
    for images, labels in tqdm(data_loader, desc=f"Epoch {epoch+1}/{num_epochs}"):
        # Zero the parameter gradients
        optimizer.zero_grad()
        
        # Forward pass
        outputs = model(images)
        loss = criterion(outputs, labels)
        
        # Backward pass and optimization
        loss.backward()
        optimizer.step()
        
        # Accumulate loss for reporting
        running_loss += loss.item()
    
    # Print the average loss for this epoch
    print(f"Epoch {epoch+1}/{num_epochs}, Loss: {running_loss / len(data_loader):.4f}")

    torch.save(model.state_dict(), f"cnn_model_epoch_{epoch+1}.pth")

