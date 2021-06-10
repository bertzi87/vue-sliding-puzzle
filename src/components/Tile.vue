<template>
  <li
    :class="{isValid: puzzle.isValidMove(index)}"
    :style="style"
  ><span v-show="showNr">{{ nr }}</span></li>
</template>

<script>

export default {
  name: 'Tile',
  props: ['nr', 'index', 'puzzle', 'showNr', 'image'],
  computed: {
    percentage() {
      return 100 / (this.puzzle.size - 1)
    },
    style() {
      const style = {
        backgroundImage: `url(${this.image})`,
        backgroundSize: 100 * this.puzzle.size + '%',
        backgroundPositionX: this.percentage * ((this.nr - 1) % this.puzzle.size) + '%',
        backgroundPositionY: this.percentage * (Math.floor((this.nr - 1) / this.puzzle.size)) + '%',
        height: `calc(100vmin/${this.puzzle.size})`,
        width: `calc(100vmin/${this.puzzle.size})`,
        fontSize: `max(calc(100vmin/${this.puzzle.size}/5), 1em)`,
        cursor: this.puzzle.isValidMove(this.index) ? 'pointer': 'auto',
      }
      if (this.nr == 0) {
        style.opacity = 0
      }
      return style
    }
  }
}
</script>

<style scoped>
li {
/*   display: inline-block; */
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;
  user-select: none;
  border-radius: 5%;
  margin-bottom: 0;
  box-shadow: 1px 1px 4px 0 rgba(0, 0, 0, 0.2);
  border: 1px solid;
/*   border-width: 0 0 1px 1px; */
  border-color: var(--my-background-color);
}

li.isValid:hover {
  box-shadow: 4px 4px 4px 0 rgba(0, 0, 0, 0.2)
}

li.isValid:hover span {
/*   opacity: .75; */
  background-color: var(--my-circle-bg-color-hover);
}

li span {
  color: var(--my-circle-color);
/*   border: 1px solid var(--my-circle-color); */
  border-radius: 50%;
  width: 1.62em;
  height: 1.62em;
/*   display: flex; */
/*   align-items: center; */
/*   justify-content: center; */
  background-color: var(--my-circle-bg-color);
  opacity: .9;
}

</style>
