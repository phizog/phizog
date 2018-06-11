import axios, { AxiosInstance } from 'axios'
import { constants } from '../constants'

export class Github {
  /**
   * Creates an instance of Github.
   * @param {string} token
   * @memberof Github
   */
  private token: string
  private axios: AxiosInstance
  constructor () {
    this.axios = axios.create({
      baseURL: constants.api.basePath
    })
  }
  setToken (token: string): void {
    this.token = token
    this.axios.interceptors.request.use(config => {
      config.headers['Authorization'] = `token ${this.token}`

      return config
    })
  }
}
