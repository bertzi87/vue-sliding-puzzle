<template>
  <div class="main" :class="{'dark-mode': isDark}">

    <div class="container my-row">
        <ImageChooser @imageChange="onImageChange" />
        <ImageSearch @beforeImageChange="onBeforeImageChange" @imageChange="onImageChange" />

        <select v-model="size" class="form-control">
          <option v-for="i in 6" :key="i">{{i + 2}}</option>
        </select>

        <button class="btn" @click="onShuffle">Shuffle</button>
        <button class="btn" @click="onSolve">Solve</button>

        <div class="custom-switch">
          <input v-model="showNr" type="checkbox" id="nr-switch" value="">
          <label for="nr-switch">Numbers</label>
        </div>

        <div class="custom-switch">
          <input v-model="boardIsRotated" type="checkbox" id="3d-switch">
          <label for="3d-switch">{{ is3dEnabled ? "2D" : "3D" }}</label>
        </div>

        <div class="custom-switch">
          <input v-model="isDark" type="checkbox" id="theme-switch">
          <label for="theme-switch">{{ isDark ? "Light" : "Dark" }}</label>
        </div>
    </div>

    <div class="board" :class="{rotated: boardIsRotated}" tabindex="0"
      @keydown.up.prevent="onKeyUp('U')" @keydown.down.prevent="onKeyUp('D')"
      @keydown.left.prevent="onKeyUp('L')" @keydown.right.prevent="onKeyUp('R')"
    >
      <Board
        :size="size"
        :board="board"
        :puzzle="puzzle"
        :image="image"
        :show="showBoard"
        :showNr="showNr"
        :gameState="gameState"
        @onTileClick="onTileClick"
      />
    </div>
  </div>
</template>

<script>
import Puzzle from "../core/puzzle.js"
import Solver from '../core/solver.js'
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
      isDark: false,
      boardIsRotated: false,
      gameState: '', // isLoading, isStarted, isSolving, isShuffling,
    }
  },
  watch: {
    size() {
      this.showBoard = false
      this.initPuzzle()
      setTimeout(() => { this.showBoard = true }, 500)
    },
    image() {
      this.board = []
      setTimeout(() => { this.initPuzzle() }, 500)
      this.showBoard = true
    }
  },
  methods: {
    initPuzzle() {
      this.gameState = 'isStarted'
      this.puzzle = new Puzzle(this.size)
      this.refreshBoard()
    },
    onBeforeImageChange() {
      this.gameState = 'isLoading'
      this.board = []
    },
    onImageChange(image) {
      this.image = image
    },
    refreshBoard() {
      this.board = [...this.puzzle.board]
    },
    onTileClick(index) {
      this.gameState = 'isStarted'
      this.puzzle.clickTo(index)
      this.refreshBoard()
    },
    onKeyUp(direction) {
      this.gameState = 'isStarted'
      this.puzzle.move(direction)
      this.refreshBoard()
    },
    onShuffle() {
      this.gameState = 'isShuffling'
      this.puzzle.shuffle()
      this.refreshBoard()
    },
    moveToWithTimeout(dir) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.puzzle.moveEmpty(dir)
          this.refreshBoard()
          resolve()
        }, 100)
      })
    },
    async onSolve() {
      this.gameState = 'isSolving'
      const solver = new Solver(this.puzzle)

      console.time("solver")
      const res = solver.solve()
      console.timeEnd("solver")

      console.log("Visited Nodes ", solver.visitedNr)
      console.log(res.path)

      this.isSolving = true
      for (const dir of res.path) {
        if (this.isSolving) {
          await this.moveToWithTimeout(dir)
        }
      }
    },
  },
}
</script>

<style scoped>
.main {
  min-height:100%;
  perspective: 1200px;
}

.board.rotated  {
  transform: rotateX(30deg) translateY(-80px);
  transform-style: preserve-3d;
}

.board {
  margin-top: 10px;
  transition: transform 300ms ease-out;
  --my-background-color: var(--lm-base-body-bg-color);
  --my-circle-color: white;
  --my-circle-bg-color: rgba(0, 0, 0, .3);
}

.dark-mode .board {
  --my-background-color: var(--dm-base-body-bg-color);
  --my-circle-color: black;
  --my-circle-bg-color: rgba(255, 255, 255, .3);
}

.my-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
}
.my-row > * {
  width: auto;
  margin: 5px !important;
}
.board {
  width: 100%;
  height: 100%;
  outline: 0;
}
</style>
