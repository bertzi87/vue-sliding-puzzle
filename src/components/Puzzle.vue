<template>
  <div>
    <select v-model="size">
      <option v-for="i in 8" :key="i">{{i + 2}}</option>
    </select>
    <button @click="onShuffle">Shuffle</button>
  </div>
  <div class="container">
    <Board
      :size="size"
      :board="board"
      :show="showBoard"
      @onTileClick="onTileClick"
    />
  </div>
</template>

<script>
import Puzzle from "../core/puzzle.js"
import Board from "./Board.vue"

export default {
  name: 'Puzzle',
  components: {
    Board
  },
  data() {
    return {
      size: 3,
      board: [],
      showBoard: false,
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
    onShuffle() {
      this.puzzle.shuffle()
      this.refreshBoard()
    }
  },
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
/*   box-sizing: border-box; */
/*   text-align: center; */
}
</style>
