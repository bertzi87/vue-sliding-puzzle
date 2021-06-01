<template>
  <li
    :style="style"
    :class="{validMove: isValidMove}"
  ><span v-show="showNr">{{ nr }}</span></li>
</template>

<script>

export default {
  name: 'Tile',
  props: ['nr', 'size', 'showNr', 'image', 'isValidMove'],
  computed: {
    percentage() {
      return 100 / (this.size - 1)
    },
    style() {
      return {
        backgroundImage: `url(${this.image})`,
        backgroundSize: 100 * this.size + '%',
        backgroundPositionX: this.percentage * ((this.nr - 1) % this.size) + '%',
        backgroundPositionY: this.percentage * (Math.floor((this.nr - 1) / this.size)) + '%',
        height: `calc(100vmin/${this.size})`,
        width: `calc(100vmin/${this.size})`,
        fontSize: `max(calc(100vmin/${this.size}/5), 1em)`,
        opacity: (this.nr == 0) ? 0 : 1,
        cursor: this.isValidMove ? 'pointer': 'auto',
      }
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
  border: 1px solid;
  border-width: 0 0 1px 1px;
  border-color: var(--my-background-color);
  box-sizing: border-box;
  user-select: none;
  border-radius: 5%;
  margin-bottom: 0;
  box-shadow: 1px 1px 1px rgba(0,0,0,0.8);
  transition: box-shadow 0.3s, transform 0.3s;
}

li span {
  color: var(--my-circle-color);
  border: 1px solid var(--my-circle-color);
  border-radius: 50%;
  width: 1.62em;
  height: 1.62em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--my-circle-bg-color);
  opacity: .33;
}

li:hover span {
  opacity: .75;
}

li.validMove:hover {
  transform: translate3d(0, 0, 10px);
  box-shadow: 5px 5px 5px rgba(0, 0, 0, .5);
}
</style>
