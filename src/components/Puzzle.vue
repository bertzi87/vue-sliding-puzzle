<template>
  <div class="main" :class="{'dark-mode': isDark}">

    <div class="container form">
        <ImageChooser @imageChange="onImageChange" />
        <ImageSearch @beforeImageChange="onBeforeImageChange" @imageChange="onImageChange" />

        <select v-model="size" class="form-control">
          <option v-for="i in 6" :key="i">{{i + 2}}</option>
        </select>

        <button class="btn" @click="onShuffle">Shuffle</button>
        <button class="btn" @click="onSolve">Solve</button>

        <Switch v-model:value="showNr" id="nr-switch" >Numbers</Switch>
        <Switch v-model:value="boardIsRotated" id="3d-switch" >{{ boardIsRotated ? "2D" : "3D" }}</Switch>
        <Switch v-model:value="isDark" id="theme-switch" >{{ isDark ? "Light" : "Dark" }}</Switch>
    </div>

    <div class="board" :class="{rotated: boardIsRotated}" tabindex="0"
      @keydown.up.prevent="onKeyUp('U')" @keydown.down.prevent="onKeyUp('D')"
      @keydown.left.prevent="onKeyUp('L')" @keydown.right.prevent="onKeyUp('R')"
    >
      <Board
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
import { Puzzle, Solver } from "node-sliding-puzzle-solver"
import Board from "./Board.vue"
import ImageChooser from "./form/ImageChooser.vue"
import ImageSearch from "./form/ImageSearch.vue"
import Switch from "./form/Switch.vue"

export default {
  name: 'Puzzle',
  components: {
    Board,
    ImageChooser,
    ImageSearch,
    Switch,
  },
  data() {
    return {
      size: 4,
      puzzle: {},
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
      if (this.gameState !== 'isLoading') {
        this.puzzle.board = []
      }
      setTimeout(() => { this.initPuzzle() }, 500)
      this.showBoard = true
    }
  },
  methods: {
    initPuzzle() {
      this.gameState = 'isStarted'
      this.puzzle = new Puzzle(this.size)
    },
    onBeforeImageChange() {
      this.gameState = 'isLoading'
      this.puzzle.board = []
    },
    onImageChange(image) {
      this.image = image
    },
    onTileClick(index) {
      this.gameState = 'isStarted'
      this.puzzle.clickTo(index)
    },
    onKeyUp(direction) {
      this.gameState = 'isStarted'
      this.puzzle.move(direction)
    },
    onShuffle() {
      this.gameState = 'isShuffling'
      this.puzzle.shuffle()
    },
    async onSolve() {
      this.gameState = 'isSolving'
      const solver = new Solver(this.puzzle)

      console.time("solver")
      const path = solver.getPath()
      console.timeEnd("solver")

      console.log(path)

      for (const dir of path) {
        if (this.gameState == 'isSolving') {
          await new Promise(resolve => setTimeout(resolve, 100)); // sleep(100ms)
          this.puzzle.moveEmpty(dir)
        }
      }
    },
  },
}
</script>

<style scoped>
.main {
  min-height: 100%;
  min-width: 100%;
  perspective: 1000px;
}

.board.rotated  {
  transform: rotateX(30deg) translateY(-40px);
  transform-style: preserve-3d;
}

.board {
  margin-top: 10px;
  transition: transform 300ms ease-out;
  --my-background-color: white;
  --my-circle-color: white;
  --my-circle-bg-color: rgba(0, 0, 0, .2);
  --my-circle-bg-color-hover: rgba(0, 0, 0, .4);
}

.dark-mode .board {
  --my-background-color: #25282c;
  --my-circle-color: black;
  --my-circle-bg-color: rgba(255, 255, 255, .2);
  --my-circle-bg-color-hover: rgba(255, 255, 255, .4);
}

.form {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: row wrap;
}
.form > * {
  width: auto;
  margin: 5px !important;
}
.board {
  width: 100%;
  height: 100%;
  outline: 0;
}
</style>
