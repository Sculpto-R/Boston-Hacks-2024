// Azure Custom Vision API endpoint and Prediction Key
const PREDICTION_URL = url;
const PREDICTION_KEY = key;

// Validate if the input is valid JSON
function validateJSONInput() {
    const jsonInput = document.getElementById('jsondata').value;
    
    try {
        JSON.parse(jsonInput);  // Try to parse the input as JSON
        imageify(jsonInput);
        return true;
    } catch (e) {
        alert("Invalid JSON format. Please enter valid JSON.");
        return false;
    }
}

function imageify() {
    
    detectShape()
}

// Attach event listener to validate JSON before form submission
document.querySelector('form').addEventListener('submit', function(event) {
    if (!validateJSONInput()) {
        event.preventDefault();  // Prevent form submission if invalid JSON
    }
});

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