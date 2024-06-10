<template>
  <div id="app">
    <h1>Image to Story App</h1>
    <button @click="fetchAndGenerateStory">Generate Story</button>
    <StoryDisplay :story="story.text" :audioPath="story.audioPath" />
  </div>
</template>

<script>
import StoryDisplay from './components/StoryDisplay.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    StoryDisplay,
  },
  data() {
    return {
      story: {
        text: '',
        audioPath: ''
      },
    };
  },
  methods: {
    async fetchAndGenerateStory() {
      try {
        const response = await axios.post('http://localhost:3000/generate-story');
        this.story = response.data;
      } catch (error) {
        console.error('Error generating story:', error);
      }
    }
  },
};
</script>

<style>

body {
  background-color: lightblue; /* Change this to the desired color */
  margin: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

