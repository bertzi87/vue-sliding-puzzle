<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__bounceInLeft"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <div class="wrapper" v-if="show && image" :class="{enable3d: enable3d}">
      <div class="list">
        <transition-group
          name="puzzle-list"
          tag="ul"
        >
          <Tile
            v-for="(nr, index) in board"
            :puzzle="puzzle"
            :key="nr"
            :nr="nr"
            :isValidMove="puzzle.isValidMove(index)"
            :showNr="showNr"
            :size="size"
            :image="image"
            :validMove="false"
            @click="$emit('onTileClick', index)"
          />
        </transition-group>
      </div>
    </div>
  </transition>
</template>

<script>
import Tile from './Tile.vue'

export default {
  name: 'Board',
  props: ['size', 'board', 'show', 'showNr', 'image', 'puzzle', 'enable3d'],
  components: {
    Tile
  },
  methods: {
//     beforeEnter(el) {
//       console.log('before enter')
//       el.style.transform = "rotate(45deg)"
//     },
//     beforeLeave(el) {
//       console.log('before leave')
//       el.style.transform = "rotate(45deg)"
//     },
//     enter() {
//       console.log('enter')
//     }
  }
}
</script>

<style scoped>
.puzzle-list-move {
  transition: transform 200ms;
  transform: translate3d(0, 0, 10px);
}

ul {
  width: 100vmin;
  height: 100vmin;
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}

.wrapper {
  perspective: 1000px;
}

.list {
  transition: transform 1s;
}

.enable3d .list {
  transform: rotateX(30deg);
  transform-style: preserve-3d;
}
</style>
