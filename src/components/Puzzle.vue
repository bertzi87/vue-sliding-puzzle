<template>
  <div class="main" :class="{'dark-mode': isDark}">

    <div class="container my-row">
        <ImageChooser @imageChange="onImageChange" />
        <ImageSearch @imageChange="onImageChange" />

        <select v-model="size" class="form-control">
          <option v-for="i in 8" :key="i">{{i + 2}}</option>
        </select>

        <button class="btn" @click="onShuffle">Shuffle</button>
        <button class="btn" @click="onSolve">Solve</button>

        <div class="custom-switch">
          <input v-model="showNr" type="checkbox" id="checkbox-4" value="">
          <label for="checkbox-4">Numbers</label>
        </div>

        <div class="custom-switch">
          <input v-model="is3dEnabled" type="checkbox" id="3d-switch">
          <label for="3d-switch">{{ is3dEnabled ? "2D" : "3D" }}</label>
        </div>

        <div class="custom-switch">
          <input v-model="isDark" type="checkbox" id="theme-switch">
          <label for="theme-switch">{{ isDark ? "Light" : "Dark" }}</label>
        </div>
    </div>

    <div
      class="board"
      tabindex="0"
      @keydown.up.prevent="onKeyUp('U')"
      @keydown.down.prevent="onKeyUp('D')"
      @keydown.left.prevent="onKeyUp('L')"
      @keydown.right.prevent="onKeyUp('R')"
    >
      <Board
        :size="size"
        :board="board"
        :puzzle="puzzle"
        :image="image"
        :show="showBoard"
        :showNr="showNr"
        :enable3d="is3dEnabled"
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
      isSolving: false,
      is3dEnabled: false,
    }
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
//       this.board = (new Puzzle(this.size)).getSolvedBoard()
//       this.puzzle = new Puzzle(this.size, this.board)
      this.puzzle = new Puzzle(this.size)
      this.refreshBoard()
      setTimeout(() => { this.showBoard = true }, 500)
    },
    refreshBoard() {
      this.board = [...this.puzzle.board]
    },
    onTileClick(index) {
      this.puzzle.clickTo(index)
      this.isSolving = false
      this.refreshBoard()
    },
    onKeyUp(direction) {
      this.puzzle.move(direction)
      this.refreshBoard()
    },
    onShuffle() {
      this.puzzle.shuffle()
      this.isSolving = false
      this.refreshBoard()
    },
    moveToWithTimeout(dir) {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.puzzle.moveEmpty(dir)
          this.refreshBoard()
          resolve()
        }, 200)
      })
    },
    async onSolve() {
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
    onImageChange(image) {
      this.image = image
    }
  },
}
</script>

<style scoped>
.main {
  min-height:100%
}

.board {
  margin-top: 10px;
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
