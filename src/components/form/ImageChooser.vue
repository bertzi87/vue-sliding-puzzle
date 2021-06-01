<template>
  <input type="file" id="image-chooser" @change="onImageChange()">
</template>

<script>
export default {
  emits: ['imageChange'],
  methods: {
    onImageChange() {
      let image = document.getElementById("image-chooser").files[0];
      let reader = new FileReader();
      reader.onload = e => this.$emit("imageChange", e.target.result)
      reader.readAsDataURL(image);
    },
  }
}
</script>

<style>
</style>
