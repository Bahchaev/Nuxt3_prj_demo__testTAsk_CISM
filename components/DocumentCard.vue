<script setup lang="ts">

import { IDocument } from '~/api/types/documents'

interface IProps {
  document: IDocument,
  isActive?: boolean,
}

const props = withDefaults(defineProps<IProps>(), {
  isActive: false
})

// eslint-disable-next-line func-call-spacing
const emits = defineEmits<{
  (event: 'click', value: IDocument): void
}>()

function docClick ():void {
  emits('click', props.document)
}

const imageLoad = ref(true)
</script>

<template>
  <div class="document-card" :class="{'active': isActive}" @click="docClick">
    <div class="document-card__left" :class="{'skeleton': !!document.image}">
      <img
        v-if="document.image"
        v-show="!imageLoad"
        :src="document.image"
        alt=""
        loading="lazy"
        @load="imageLoad = false"
      >
      <BaseLoader v-if="imageLoad && document.image" />
    </div>
    <div class="document-card__right">
      <h3 class="document-card__name">
        {{ document.name }}
      </h3>
      <p class="document-card__size">
        {{ `${document.size || 12} Мб` }}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.document-card {
  height: 70px;
  width: 100%;
  display: grid;
  grid-template-columns: 70px 1fr;
  align-items: center;
  background: white;
  box-shadow: $box-shadow;
  &:hover {
    cursor: pointer;
      border: 1px solid $blue;
  }

  &__left {
    border-right: 1px solid #E0E0E0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  &__right {
    padding: 15px;

  }

  &__name {
    margin-bottom: 6px;
  }

  &__size {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
  }
}

.active {
  .document-card {
    &__right {
      background: $blue;
    }

    &__name {
      color: #F8F9FA;
    }

    &__size {
      color: #DEE2E6
    }
  }
}

.skeleton {
  background: transparent center center no-repeat;
}
</style>
