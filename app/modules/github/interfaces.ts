import { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'

export interface IGithub {
  token: string
  axios: AxiosInstance
  setToken: (token: string) => void
  ping: () => AxiosPromise
  createGist: (files: IFile) => AxiosPromise
  downloadGist: (id: string) => AxiosPromise
  findGist: (page: number) => Promise<any>
  gistExtractor: (res: AxiosResponse) => any
}

export interface IFile {
  [key: string]: {
    content: string
  }
}