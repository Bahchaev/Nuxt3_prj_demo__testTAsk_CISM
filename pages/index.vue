<script lang="ts" setup>
import DocumentInfo from '~/components/DocumentInfo.vue'
import SearchForm from '~/components/SearchForm.vue'

</script>

<template>
  <div class="container">
    <div class="header">
      <h1 class="header__title">
        My App
      </h1>
      <div class="header__user-name">
        Username
      </div>
    </div>

    <div class="main">
      <SearchForm class="main__left" />
      <DocumentInfo class="main__right" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  max-width: 1366px;
  padding: 50px;
  margin: 0 auto;
}
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;
}
.main {
  height: 575px;
  overflow: hidden;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  display: grid;
  grid-template-columns: 282px auto;
}
</style>
