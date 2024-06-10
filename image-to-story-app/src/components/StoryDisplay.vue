<template>
  <div>
    <h2>Generated Story</h2>
    <p v-if="story">{{ story }}
 </p>
    <p v-else>No story generated yet.</p>
    <audio ref="audioPlayer" controls style="display: none;"></audio>
    <button v-if="story" @click="playAudio">Play Audio</button>
    <button v-if="isPlaying" @click="stopAudio">Stop Audio</button>
  </div>
</template>

<script>
export default {
  name: 'StoryDisplay',
  props: {
    story: {
      type: String,
      required: true,
    },
    audioPath: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      isPlaying: false,
      audioPlayer: null,
    };
  },
  mounted() {
    this.audioPlayer = this.$refs.audioPlayer;
  },
  methods: {
    playAudio() {
      this.audioPlayer.src = `http://localhost:3000/${this.audioPath}`;
      this.audioPlayer.play();
      this.isPlaying = true;
    },
    stopAudio() {
      this.audioPlayer.pause();
      this.audioPlayer.currentTime = 0;
      this.isPlaying = false;
    },
  },
};
</script>
