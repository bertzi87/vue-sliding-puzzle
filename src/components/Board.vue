<template>
  <transition
    name="custom-classes-transition"
    :enter-active-class="['animate__animated', animation.enter].join(' ')"
    :leave-active-class="['animate__animated', animation.leave].join(' ')"
  >
    <transition-group
      v-if="show && image"
      name="puzzle-list"
      tag="ul"
      @before-enter="beforeEnter"
      @enter="enter"
      @leave="leave"
    >
      <Tile
        class="puzzle-list-item"
        :class="class"
        v-for="(nr, index) in puzzle.board"
        :puzzle="puzzle"
        :key="nr"
        :nr="nr"
        :index="index"
        :showNr="showNr"
        :image="image"
        :data-index="index"
        :data-nr="nr"
        @click="$emit('onTileClick', index)"
      />
    </transition-group>
  </transition>
</template>

<script>
import gsap from 'gsap'
import Tile from './Tile.vue'
import { getGSAPVars } from '../animations.js'

export default {
  name: 'Board',
  props: ['show', 'showNr', 'image', 'puzzle', 'gameState'],
  data() {
    return {
      animation: {
        enter: 'animate__bounceInLeft',
        leave: 'animate__bounceOutRight'
      },
    }
  },
  components: {
    Tile
  },
  methods: {
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      gsap.to(el, getGSAPVars(false, el.dataset.nr, el.dataset.index, this.puzzle.size, done))
    },
    leave(el, done) {
      gsap.to(el, getGSAPVars(true, el.dataset.nr, el.dataset.index, this.puzzle.size, done))
    }
  },
  computed: {
    class() {
      if (this.gameState == 'isShuffling') {
        return ["puzzle-list-item-shuffle-" + this.puzzle.size]
      }
      return this.gameState == 'isSolving' ? ["puzzle-list-item-solve"] : []
    }
  },
  watch: {
    'puzzle.size'(size, oldSize) {
      this.animation = (size < oldSize) ? {
        enter: 'animate__bounceInLeft',
        leave: 'animate__bounceOutRight',
      } : {
        enter: 'animate__bounceInRight',
        leave: 'animate__bounceOutLeft',
      }
    },
    'puzzle.board': {
      handler() {
        // vuejs issue: https://github.com/vuejs/vue/issues/11376
        document.getElementsByClassName("puzzle-list-item").forEach(
          el => {
            el.getBoundingClientRect = function() {
              return {
                left: this.offsetLeft,
                top: this.offsetTop
              }
            }
          }
        );
      },
      deep: true
    },
  }
}
</script>

<style lang="scss">

.puzzle-list-move {
  transition: all 200ms ease-out;
}

.puzzle-list-item-solve {
  transition: all 100ms ease-out;
}

@for $i from 3 through 8 {
  .puzzle-list-item-shuffle-#{$i} {
    transition: all $i * 25ms + 200ms ease-out;
  }
}

ul {
  width: calc(100vmin + 2px);
  height: calc(100vmin + 2px);
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
</style>
