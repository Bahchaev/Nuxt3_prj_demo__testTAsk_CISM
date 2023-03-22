<script setup lang="ts">

</script>

<template>
  <div class="base-loader" />
</template>

<style lang="scss" scoped>
.base-loader {
  width: 30px;
  height: 30px;
  border-width: 4px 4px 0 0;
  border-style: solid;
  border-color: $grey;
  border-radius: 50%;
  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;}

@keyframes spin {
  from {
    transform:rotate(0deg);
  }
  to {
    transform:rotate(360deg);
  }
}

</style>
