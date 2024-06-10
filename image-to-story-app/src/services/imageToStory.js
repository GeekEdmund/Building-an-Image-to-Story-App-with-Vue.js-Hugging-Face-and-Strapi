import axios from 'axios';
import { BlipForConditionalGeneration, BlipProcessor } from '@transformers/models';
import { Image } from 'canvas';
import { createWriteStream } from 'fs';
import { buffer } from 'buffer';
import { gtts } from 'node-gtts';

async function generateStory(imageUrl, accessToken) {
  try {
    // Load the pre-trained BLIP model and processor
    const model = await BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base");
    const processor = await BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base");

    // Fetch and open the image from the provided URL
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const image = new Image();
    image.src = Buffer.from(response.data);

    // Preprocess the image
    const inputs = processor(images=image, return_tensors="pt");

    // Generate the story from the image
    const outputIds = await model.generate(inputs.pixel_values, { max_length: 200, num_beams: 5, early_stopping: true });
    const story = await processor.decode(outputIds[0], { skip_special_tokens: true });

    return story;
  } catch (error) {
    console.error('Error generating story:', error);
    throw error;
  }
}

async function textToSpeech(text) {
  try {
    // Create a gTTS object
    const tts = gtts(text, 'en');

    // Save the audio to a file
    const audioStream = tts.pipe(createWriteStream('story_audio.mp3'));

    // Play the audio
    audioStream.on('finish', () => {
      const audio = new Audio('story_audio.mp3');
      audio.play();
    });
  } catch (error) {
    console.error('Error converting text to speech:', error);
    throw error;
  }
}

export { generateStory, textToSpeech };
