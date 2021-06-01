<template>
  <transition
    name="custom-classes-transition"
    enter-active-class="animate__animated animate__bounceInLeft"
    leave-active-class="animate__animated animate__bounceOutRight"
  >
    <div v-if="show && image">
      <transition-group
        name="puzzle-list"
        tag="ul"
      >
        <Tile
          v-for="(nr, index) in board"
          :key="nr"
          :nr="nr"
          :showNr="showNr"
          :size="size"
          :image="image"
          @click="$emit('onTileClick', index)"
        />
      </transition-group>
    </div>
  </transition>
</template>

<script>
import Tile from './Tile.vue'

export default {
  name: 'Board',
  props: ['size', 'board', 'show', 'showNr', 'image'],
  components: {
    Tile
  },
}
</script>

<style scoped>
.puzzle-list-move {
  transition: transform 200ms;
}

ul {
  width: 100vmin;
  height: 100vmin;
  padding: 0;
  margin: 0 auto;
  list-style-type: none;
}
</style>
