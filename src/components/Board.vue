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
            :key="nr"
            :nr="nr"
            :isValidMove="puzzle.isValidMove(index)"
            :showNr="showNr"
            :size="size"
            :image="image"
            :validMove="false"
            class="test-class"
            @click="$emit('onTileClick', index)"
          />
        </transition-group>
      </div>
    </div>
  </transition>
</template>

<script>
function getOffsetPosition() {
  return {
    left: this.offsetLeft,
    top: this.offsetTop
  };
}

import Tile from './Tile.vue'

export default {
  name: 'Board',
  props: ['size', 'board', 'show', 'showNr', 'image', 'puzzle', 'enable3d'],
  components: {
    Tile
  },
  watch: {
    board() {
      document.getElementsByClassName("test-class").forEach(
        el => {
          el.getBoundingClientRect = getOffsetPosition
        }
      );
    },
  }
}
</script>

<style scoped>
.puzzle-list {
  box-shadow: 1px 1px 1px rgba(0, 0, 0, .5);
  transition: transform 150ms ease-out, box-shadow 150ms ease-out;
}

.puzzle-list-move {
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .5);
  transform: translate3d(0, 0, 15px);
  transition: transform 150ms ease-in, box-shadow 150ms ease-in;
}

ul {
  width: 100vmin;
  height: 100vmin;
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}

.wrapper {
  perspective: 1200px;
}

.list {
  transition: transform 1s;
}

.enable3d .list {
  transform: rotateX(30deg) translateY(-80px);
/*   transform: translateX(10px); */
  transform-style: preserve-3d;
}
</style>
