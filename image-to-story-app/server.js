const express = require('express');
const cors = require('cors');
const { generateStory, textToSpeech } = require('./imageToStory');
const path = require('path');

const app = express();
app.use(cors());

// Serve static files from the root directory
app.use(express.static(path.join(__dirname)));

app.post('/generate-story', async (req, res) => {
  const imageUrl = 'http://localhost:1337/uploads/fish_f43a6f1ca2.jpeg';
  const accessToken = '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';

  process.env.HF_ACCESS_TOKEN = accessToken;

  try {
    const story = await generateStory(imageUrl);
    await textToSpeech(story);

    // Respond with the story text and the path to the audio file
    res.status(200).json({
      text: story,
      audioPath: 'story_audio.mp3'
    });
  } catch (error) {
    console.error(`Error: ${error}`);
    if (!res.headersSent) {
      res.status(500).send('Failed to generate story');
    }
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
