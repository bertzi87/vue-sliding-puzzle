<template>
  <li :style="style"><span v-show="showNr">{{ nr }}</span></li>
</template>

<script>

export default {
  name: 'Tile',
  props: ['nr', 'size', 'showNr', 'image'],
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
        opacity: (this.nr == 0) ? 0 : 1,
        fontSize: `calc(100vmin/${this.size}/5)`,
      }
    }
  }
}
</script>

<style>
li {
/*   display: inline-block; */
  display: flex;
  justify-content: center;
  align-items: center;
  float: left;

/*   width: 100px; */
/*   height: 100px; */
  border: 1px solid white;
  box-sizing: border-box;
  user-select: none;
  border-radius: 5%;
}

li span {
  color: white;
  border: 1px solid white;
  border-radius: 50%;
  width: 1.5em;
  height: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, .2);
}
</style>
