import { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'

export interface IGithub {
  token: string
  axios: AxiosInstance
  setToken: (token: string) => void
  ping: () => AxiosPromise
  createGist: (files: IFile) => AxiosPromise
  downloadGist: (id?: string) => AxiosPromise
  deleteGist: (id: string) => AxiosPromise
  updateGist: (id: string, files: IFile) => AxiosPromise
  findGist: (page: number) => Promise<any>
  gistExtractor: (res: AxiosResponse) => Promise<any>
  exchanger: (code: string) => Promise<any>
}

export interface IFile {
  [key: string]: {
    content: string
  }
}
