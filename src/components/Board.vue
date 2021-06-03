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
        v-for="(nr, index) in board"
        :key="nr"
        :nr="nr"
        :isValidMove="puzzle.isValidMove(index)"
        :showNr="showNr"
        :size="size"
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
import { getGSAPVars } from '../core/animations'

function getOffsetPosition() {
  return {
    left: this.offsetLeft,
    top: this.offsetTop
  };
}

export default {
  name: 'Board',
  props: ['size', 'board', 'show', 'showNr', 'image', 'puzzle', 'gameState'],
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
      gsap.to(el, getGSAPVars(false, el.dataset.nr, el.dataset.index, this.size, done))
    },
    leave(el, done) {
      gsap.to(el, getGSAPVars(true, el.dataset.nr, el.dataset.index, this.size, done))
    }
  },
  computed: {
    transitionGroupSpeed() {
      if (this.gameState == 'isShuffling') {
        return (200 + this.size * 25) + 'ms'
      }
      return this.gameState == 'isSolving' ? '100ms' : '200ms'
    }
  },
  watch: {
    size(size, oldSize) {
      this.animation = (size < oldSize) ? {
        enter: 'animate__bounceInLeft',
        leave: 'animate__bounceOutRight',
      } : {
        enter: 'animate__bounceInRight',
        leave: 'animate__bounceOutLeft',
      }
    },
    board() {
      document.getElementsByClassName("puzzle-list-item").forEach(
        el => {
          el.getBoundingClientRect = getOffsetPosition
        }
      );
    },
  }
}
</script>

<style>

.puzzle-list-move {
/*   transition: all 200ms ease-out; */
  transition: all v-bind(transitionGroupSpeed) ease-out;
}

ul {
  width: 100vmin;
  height: 100vmin;
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
</style>
