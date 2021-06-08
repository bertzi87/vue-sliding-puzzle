<template>
  <form @submit.prevent="getImage">
    <div class="input-group">
      <input v-model="word" type="text" class="form-control" placeholder="Search">
      <div class="input-group-append">
        <button @click="getImage" class="btn" type="button">Search</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  emits: ['imageChange', 'beforeImageChange'],
  data() {
    return {
      word: ''
    }
  },
  mounted() {
    this.getImage()
  },
  methods: {
    async getImage() {

      // word is already an image url
      if (this.word.match(/^http/g)) {
        this.$emit('imageChange', this.word)
        return
      }

      this.$emit('beforeImageChange')
      // get an url based on word and window size
      const size = this.getMinWindowSize()
      const search = this.word.replace(' ', ',')
      try {
        const response = await fetch(`https://source.unsplash.com/featured/${size}x${size}/?${search}`)
        this.$emit('imageChange', response.url)
      } catch {
        this.$emit('imageChange', '3.jpg')
      }
    },
    getMinWindowSize() {
      return Math.min(window.innerHeight, window.innerWidth)
    }
  }
}
</script>

<style scoped>
</style>
