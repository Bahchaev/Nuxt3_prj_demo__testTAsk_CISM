<script setup lang="ts">
import { storeToRefs } from 'pinia'

import { useDownloadImage } from '~/api/hooks/useDownloadImage'
import { useDocumentsStore } from '~/stores/documents'

import BaseButton from '~/components/base/BaseButton.vue'

const { selectedDocument } = storeToRefs(useDocumentsStore())
const { deleteDocument } = useDocumentsStore()
const { downloadImage } = useDownloadImage()

const isDownloadImage = ref(false)

async function downloadDoc ():Promise<void> {
  try {
    isDownloadImage.value = true
    if (selectedDocument.value) {
      await downloadImage(selectedDocument.value)
    }
  } catch (e) {
    console.log(e)
  } finally {
    isDownloadImage.value = false
  }
}

function deleteDoc (): void {
  if (selectedDocument.value) {
    deleteDocument(selectedDocument.value)
  }
}

</script>

<template>
  <div class="document-info">
    <template v-if="selectedDocument">
      <div class="document-info__preview">
        <img :src="selectedDocument.image" alt="doc" loading="lazy">
      </div>
      <div class="document-info__info info">
        <h2 class="info__name">
          {{ selectedDocument.name }}
        </h2>
        <div class="info__btns">
          <BaseButton
            type="download"
            class="info__download-btn"
            :disabled="!selectedDocument.image || isDownloadImage"
            @click="downloadDoc"
          >
            Скачать
          </BaseButton>
          <BaseButton
            type="delete"
            class="info__delete-btn"
            :disabled="!selectedDocument.image"
            @click="deleteDoc"
          >
            Удалить
          </BaseButton>
        </div>
        <h2 class="info__description-title">
          Описание
        </h2>
        <p class="info__description">
          {{ selectedDocument.description }}
        </p>
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.document-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 61px;
  background: white;
  padding: 30px;
  border-left: 1px solid #E0E0E0;
}

.info {
  &__btns {
    margin-bottom: 47px;
    display: flex;
    flex-wrap: wrap;
    gap: 17px;
  }
  &__description {
    font-weight: 400;
    font-size: 14px;
    line-height: 17px;
    color: $grey
  }
}

h2 {
  margin-bottom: 14px;
}
</style>
