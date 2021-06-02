<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__bounceInLeft"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <transition-group
      v-if="show && image"
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
  props: ['size', 'board', 'show', 'showNr', 'image', 'puzzle'],
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
.puzzle-list-move {
/*   transform: translate3d(0, 0, 5px); */
/*   box-shadow: 4px 4px 8px 0 rgba(0, 0, 0, 0.5), 3px 6px 20px 0 rgba(0, 0, 0, 0.5); */
  transition: transform 200ms ease-out, box-shadow 200ms ease-out;
}

ul {
  width: 100vmin;
  height: 100vmin;
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
</style>
