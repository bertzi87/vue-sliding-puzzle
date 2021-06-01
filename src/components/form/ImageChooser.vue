<template>
  <div class="custom-file">
    <input type="file" id="image-chooser" @change="onImageChange()">
    <label for="image-chooser">Choose an image...</label>
  </div>
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

<style scoped>
label {
  margin-bottom: 0;
}
</style>
