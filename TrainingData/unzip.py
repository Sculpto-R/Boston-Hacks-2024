import zipfile
import os

# # Define path to your zip file
# zip_file_path = 'TrainingData/2D geometric shapes dataset.zip'
# extracted_path = 'TrainingData'

# # Unzip the dataset
# with zipfile.ZipFile(zip_file_path, 'r') as zip_ref:
#     zip_ref.extractall(extracted_path)

import os
import shutil

# Define your dataset path
dataset_path = 'TrainingData/2D geometric shapes dataset/output'

# Get a list of all image files in the dataset path
files = [f for f in os.listdir(dataset_path) if os.path.isfile(os.path.join(dataset_path, f))]

# Iterate over each file in the dataset path
for file_name in files:
    # Extract the shape class from the file name (e.g., "Triangle" from "Triangle_f38d822a-2a98-11ea-8123-8363a7ec19e6.png")
    shape_class = file_name.split('_')[0]

    # Define the directory for this class
    class_dir = os.path.join(dataset_path, shape_class)

    # Create the class directory if it doesn't exist
    os.makedirs(class_dir, exist_ok=True)

    # Move the file into the appropriate class directory
    src_path = os.path.join(dataset_path, file_name)
    dst_path = os.path.join(class_dir, file_name)
    shutil.move(src_path, dst_path)

print("Files organized into class folders.")
