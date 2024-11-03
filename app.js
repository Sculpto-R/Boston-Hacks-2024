// Azure Custom Vision API endpoint and Prediction Key
const PREDICTION_URL = 'https://shapeteller-prediction.cognitiveservices.azure.com/customvision/v3.0/Prediction/832f1196-d884-4b2f-b489-a732bb3093bc/classify/iterations/Iteration1/image';
const PREDICTION_KEY = '81exKPfZbt51A2t3x4ZH4yKT7IaOCCMHg1gHodHDw6H4DgH7OBMqJQQJ99AKACYeBjFXJ3w3AAAIACOGosN3';

async function detectShape() {
    const fileInput = document.getElementById('imageInput');
    const file = fileInput.files[0];
    
    if (!file) {
        alert("Please upload an image first.");
        return;
    }

    try {
        // Send the image file to the Azure Custom Vision API
        const response = await fetch(PREDICTION_URL, {
            method: 'POST',
            headers: {
                'Prediction-Key': PREDICTION_KEY,
                'Content-Type': 'application/octet-stream'
            },
            body: file
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the JSON response
        const result = await response.json();
        displayResult(result);
    } catch (error) {
        console.error("Prediction error:", error);
        document.getElementById('result').textContent = "Error detecting shape. Please try again.";
    }
}

// Function to display the prediction result
function displayResult(result) {
    if (result.predictions && result.predictions.length > 0) {
        const topPrediction = result.predictions[0];
        const shape = topPrediction.tagName;
        const confidence = (topPrediction.probability * 100).toFixed(2);
        document.getElementById('result').textContent = `Detected Shape: ${shape} with ${confidence}% confidence`;
    } else {
        document.getElementById('result').textContent = "No shapes detected.";
    }
}