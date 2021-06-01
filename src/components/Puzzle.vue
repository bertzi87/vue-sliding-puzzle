<template>
  <div
    tabindex="0"
    v-on:keyup.up="onKeyUp('U')"
    v-on:keyup.down="onKeyUp('D')"
    v-on:keyup.left="onKeyUp('L')"
    v-on:keyup.right="onKeyUp('R')"
  >
    <div>
      <ImageChooser @imageChange="onImageChange" />
      <ImageSearch @imageChange="onImageChange" />

      <select v-model="size">
        <option v-for="i in 8" :key="i">{{i + 2}}</option>
      </select>

      <button @click="onShuffle">Shuffle</button>

      <label>
        <input type="checkbox" v-model="showNr">
        Numbers
      </label>
    </div>

    <div
      class="container"
    >
      <Board
        :size="size"
        :board="board"
        :image="image"
        :show="showBoard"
        :showNr="showNr"
        @onTileClick="onTileClick"
      />
    </div>
  </div>
</template>

<script>
import Puzzle from "../core/puzzle.js"
import Board from "./Board.vue"
import ImageChooser from "./form/ImageChooser.vue"
import ImageSearch from "./form/ImageSearch.vue"

export default {
  name: 'Puzzle',
  components: {
    Board,
    ImageChooser,
    ImageSearch,
  },
  data() {
    return {
      size: 4,
      board: [],
      showBoard: false,
      image: '',
      showNr: true,
    }
  },
  created() {
    this.initPuzzle()
  },
  mounted() {
    this.board = this.puzzle.board
  },
  watch: {
    size() {
      this.initPuzzle()
    },
    image() {
      this.initPuzzle()
    }
  },
  methods: {
    initPuzzle() {
      this.showBoard = false
      this.puzzle = new Puzzle(this.size)
      this.refreshBoard()
      setTimeout(() => { this.showBoard = true }, 500)
    },
    refreshBoard() {
      this.board = [...this.puzzle.board]
    },
    onTileClick(index) {
      this.puzzle.clickTo(index)
      this.refreshBoard()
    },
    onKeyUp(direction) {
      this.puzzle.move(direction)
      this.refreshBoard()
    },
    onShuffle() {
      this.puzzle.shuffle()
      this.refreshBoard()
    },
    onImageChange(image) {
      this.image = image
    }
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}
</style>
