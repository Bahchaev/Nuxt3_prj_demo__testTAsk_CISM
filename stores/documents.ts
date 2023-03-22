import { computed } from 'vue'
import { defineStore } from 'pinia'

import { useFetchDocuments } from '~/api/hooks/useFetchDocuments'
import { IDocument } from '~/api/types/documents'

export const useDocumentsStore = defineStore('documents', () => {
  const documents = ref<IDocument[]>([])
  const { getDocuments } = useFetchDocuments()

  const getterDocuments = computed(() => {
    return documents.value.map(doc => ({
      ...doc,
      image: doc.image ? `${doc.image}?id=${doc.id}` : ''
    }))
  })

  async function fetchDocuments (payload: string): Promise<void> {
    const docs = await getDocuments(payload)
    setDocuments(docs)
  }

  function setDocuments (docs: IDocument[]): void {
    documents.value = docs
  }

  function deleteDocument (doc: IDocument): void {
    selectedDocument.value!.image = ''
    const _doc = documents.value.find(d => d.id === doc.id)
    if (_doc) {
      _doc.image = ''
    }
  }

  const selectedDocument = ref<IDocument | null>(null)

  function setSelectedDocument (doc: IDocument): void {
    selectedDocument.value = doc
  }

  return {
    getterDocuments,
    fetchDocuments,
    deleteDocument,
    selectedDocument,
    setSelectedDocument
  }
})
