<template>
  <transition
    name="custom-classes-transition"
    :enter-active-class="['animate__animated', animationEnter].join(' ')"
    :leave-active-class="['animate__animated', animationLeave].join(' ')"
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
        :validMove="false"
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

function getOffsetPosition() {
  return {
    left: this.offsetLeft,
    top: this.offsetTop
  };
}

export default {
  name: 'Board',
  props: ['size', 'board', 'show', 'showNr', 'image', 'puzzle', 'isSearching'],
  data() {
    return {
      animationEnter: 'animate__bounceInLeft',
      animationLeave: 'animate__bounceOutRight',
    }
  },
  components: {
    Tile
  },
  methods: {
    col(index) {
      return index % this.size
    },
    row(index) {
      return Math.floor(index / this.size)
    },
    beforeEnter(el) {
      el.style.opacity = 0
    },
    enter(el, done) {
      gsap.to(el, {
        opacity: el.dataset.nr == 0 ? 0 : 1,
        rotationX: 360,
        duration: 1,
//         delay: this.col(el.dataset.index) * 0.02 + 0.01 * el.dataset.index,
        delay: this.col(el.dataset.index) * 0.05 + 0.05 * this.row(el.dataset.index),
        ease: 'bounce',
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        opacity: 0,
        rotationX: -360,
        duration: 1,
//         delay: (this.size - this.row(el.dataset.index)) * 0.1,
//         delay: this.col(el.dataset.index) * 0.05 + 0.05 * this.row(el.dataset.index),
        delay: (this.size - this.col(el.dataset.index)) * 0.05 + 0.05 * (this.size - this.row(el.dataset.index)),
//         delay: (this.size - this.col(el.dataset.index)) * 0.01 + 0.01 * (this.size - this.row(el.dataset.index)),
//         delay: this.col(el.dataset.index) * 0.02 + 0.01 * el.dataset.index,
        ease: 'bounce',
        onComplete: done
      })
    }
  },
  watch: {
    size(size, oldSize) {
      if (size < oldSize) {
        this.animationEnter = 'animate__bounceInLeft'
        this.animationLeave = 'animate__bounceOutRight'
      } else {
        this.animationEnter = 'animate__bounceInRight'
        this.animationLeave = 'animate__bounceOutLeft'
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

.puzzle-list-item {
/*  transition-property: all;
  transition-duration: 2000ms;
  transition-timing-function: ease-out;*/
}

.puzzle-list-item {
/*  transition: height 200ms, width 200ms;
  transition-timing-function: ease-out;*/
}

.puzzle-list-move {
/*   background-image: red; */
/*   transform: translate3d(0, 0, 5px); */
/*   box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.5), 3px 6px 20px 0 rgba(0, 0, 0, 0.5); */
  transition: all 200ms ease-out;
}

.puzzle-list-enter-from,
.puzzle-list-leave-to {
/*   transform: scale(0); */
}

.puzzle-list-leave-active {
/*   position: absolute; */
/*   bottom: -1000px; */
}

ul {
  width: 100vmin;
  height: 100vmin;
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
</style>
