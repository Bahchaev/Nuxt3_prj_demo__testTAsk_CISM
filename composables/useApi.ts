import { useFetch, UseFetchOptions } from '#app'

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useApi = (url:string, options:UseFetchOptions<any>) => {
  const config = useRuntimeConfig()
  return useFetch(url, {
    baseURL: config.public.BASE_URL,
    ...options,
    onRequest ({ options }): Promise<void> | void {
      options.headers = {
        ...options.headers
        // add header here
      }
    },
    onRequestError ({ error }): Promise<void> | void {
      throw createError(error)
    },
    onResponseError ({ response }): Promise<void> | void {
      throw createError({ statusCode: response.status, statusMessage: response.statusText })
    }
  })
}
