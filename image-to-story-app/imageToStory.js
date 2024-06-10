const fs = require('fs');
const { exec } = require('child_process');
const gtts = require('gtts');
const path = require('path');
require('dotenv').config();

async function generateStory(imageUrl) {
  // Dynamically import node-fetch
  const fetch = (await import('node-fetch')).default;

  // Define the Hugging Face Inference API endpoint and model ID
  const apiUrl = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-base";
  const accessToken = process.env.Hf_ACCESS_TOKEN;

  // Fetch and prepare the image
  const response = await fetch(imageUrl);
  const arrayBuffer = await response.arrayBuffer();
  const imageBuffer = Buffer.from(arrayBuffer);

  // Call the Hugging Face Inference API
  const apiResponse = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: imageBuffer.toString('base64')
    })
  });

  const apiResult = await apiResponse.json();

  console.log('API Response:', apiResult); // Log the entire API response for debugging

  if (apiResponse.ok && apiResult[0] && apiResult[0].generated_text) {
    return apiResult[0].generated_text;
  } else {
    throw new Error(apiResult.error || "Error generating story");
  }
}

function textToSpeech(text) {
  if (!text) {
    throw new Error("No text to speak");
  }

  // Create a gTTS object
  const tts = new gtts(text, 'en');
  const audioFile = path.join(__dirname, 'story_audio.mp3');

  // Save the audio to a file and play it
  tts.save(audioFile, (err, result) => {
    if (err) throw new Error(err);
    console.log('Audio file saved:', audioFile);

    // Play the audio file
    exec(`mpg321 ${audioFile}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error playing audio: ${error}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      console.error(`stderr: ${stderr}`);
    });
  });
}

if (require.main === module) {
  const imageUrl = process.argv[2];
  const accessToken = process.argv[3];

  process.env.HF_ACCESS_TOKEN = accessToken;

  generateStory(imageUrl)
    .then(story => {
      console.log(story);
      textToSpeech(story);
    })
    .catch(error => {
      console.error('Error generating story:', error);
    });
}

module.exports = {
  generateStory,
  textToSpeech
};
