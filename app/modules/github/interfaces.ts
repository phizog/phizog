import { AxiosInstance, AxiosPromise } from 'axios'

export interface IGithub {
  token: string
  axios: AxiosInstance
  setToken: (token: string) => void
  ping: () => AxiosPromise
}
