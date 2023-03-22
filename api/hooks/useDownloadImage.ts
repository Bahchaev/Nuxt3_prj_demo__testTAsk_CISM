
import { useFetch } from '#app'

import { IDocument } from '~/api/types/documents'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useDownloadImage = () => {
  async function downloadImage (doc: IDocument): Promise<void> {
    const { data, error } = await useFetch(doc.image!)
    if (error.value) {
      throw error.value
    }

    if (data.value) {
      const file:Blob = data.value as Blob
      const fileURL = window.URL.createObjectURL(new Blob([file], { type: file.type }))
      const fileLink = document.createElement('a')
      fileLink.href = fileURL
      fileLink.setAttribute('download', `${doc.name}`)
      document.body.appendChild(fileLink)
      fileLink.click()
      document.body.removeChild(fileLink)
    }
  }

  return {
    downloadImage
  }
}
