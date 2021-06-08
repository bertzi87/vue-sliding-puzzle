<template>
  <div class="custom-switch">
    <input v-model="localValue" type="checkbox" :id="id">
    <label :for="id"><slot/></label>
  </div>
</template>

<script>

export default {
  props: ['value', 'id'],
  computed: {
    localValue: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('update:value', value)
      }
    }
  }
}

</script>
