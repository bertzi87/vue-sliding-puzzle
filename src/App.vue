<template>
  <Puzzle />
</template>

<script>
import Puzzle from './components/Puzzle.vue'

export default {
  name: 'App',
  components: {
    Puzzle
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  overflow-x: hidden;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
/*   max-height: 100vh; */
  height: 100%;
  width: 100%;
}
</style>
