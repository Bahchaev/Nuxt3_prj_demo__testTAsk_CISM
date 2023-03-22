<script setup lang="ts">
import { watch } from 'vue'
import { debounce } from 'vue-debounce'
import { storeToRefs } from 'pinia'

import { IDocument } from '~/api/types/documents'
import { useDocumentsStore } from '~/stores/documents'

import BaseInput from '~/components/base/BaseInput.vue'
import BaseLoader from '~/components/base/BaseLoader.vue'
import DocumentCard from '~/components/DocumentCard.vue'

const { getterDocuments, selectedDocument } = storeToRefs(useDocumentsStore())
const { setSelectedDocument, fetchDocuments } = useDocumentsStore()

const search = ref('')
const errorMessage = ref<any>()
const isLoading = ref<boolean>(false)
const emptyMessage = ref<string>('Введите запрос')

requestDocuments('')

watch(search, debounce(async (value: string) => {
  await requestDocuments(value)
}, 500))

async function requestDocuments (value:string): Promise<void> {
  try {
    isLoading.value = true
    await fetchDocuments(value)
  } catch (e:any) {
    errorMessage.value = `Error ${e.statusCode}: ${e.statusMessage}`
  } finally {
    isLoading.value = false
    emptyMessage.value = getterDocuments.value.length ? '' : 'Документов по вашему запросу не найдено'
  }
}

function docClick (doc:IDocument):void {
  setSelectedDocument(doc)
}
</script>

<template>
  <div class="search-form">
    <BaseInput
      v-model="search"
      class="search-form__input"
      label="Поиск документа"
      name="documents"
      :placeholder="'Введите ID документа'"
    />

    <div class="search-form__results results">
      <h2 class="results__title">
        Результаты
      </h2>
      <div class="results__documents documents">
        <BaseLoader v-if="isLoading" class="loader">
          Loading...
        </BaseLoader>
        <div v-else-if="errorMessage" class="documents__error-message">
          {{ errorMessage }}
        </div>
        <div v-else-if="!getterDocuments.length" class="documents__empty-message">
          {{ emptyMessage }}
        </div>
        <DocumentCard
          v-for="doc in getterDocuments"
          v-else
          :key="doc.id"
          class="documents__document"
          :document="doc"
          :is-active="doc.id === selectedDocument?.id"
          @click="docClick"
        >
          123
        </DocumentCard>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-form {
  padding: 27px 25px 27px 17px;
  display: flex;
  flex-direction: column;

  &__input {
    margin-bottom: 29px;
  }
}

.results {
  display: flex;
  flex-direction: column;
  height: 400px;
  &__title {
    margin-bottom: 18px;
}
  .documents {
    overflow-y: auto;
    padding: 10px;
    margin: -10px;
    display: grid;
    grid-template-columns: 1fr;
    gap: 18px;

    scrollbar-color: $grey;
    scrollbar-width: thin;

    &__error-message {
      color: $red;
    }

    &__empty-message {
      color: $grey;
    }

    &::-webkit-scrollbar {
      width: 2px;
      height: 2px;
    }
    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background-color: lightgrey;
      border-radius: 8px;
    }
  }
}

.loader {
  justify-self: center;
}
</style>
