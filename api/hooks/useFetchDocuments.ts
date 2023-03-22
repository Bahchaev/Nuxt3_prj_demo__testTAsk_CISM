
import { IDocument } from '~/api/types/documents'
import { useApi } from '~/composables/useApi'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useFetchDocuments = () => {
  async function getDocuments (payload: string): Promise<IDocument[]> {
    const { data, error } = await useApi(
      '/user/docs',
      {
        params: {
          search: payload || undefined
        }
      })
    if (error.value) {
      throw error.value
    }
    return data.value || []
  }

  return {
    getDocuments
  }
}
