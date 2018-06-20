import axios, { AxiosInstance, AxiosPromise } from 'axios'
import { constants } from '../constants'
import { IGithub } from './interfaces'

export class Github implements IGithub {
  /**
   * Creates an instance of Github.
   * @memberof Github
   */
  token: string
  axios: AxiosInstance
  constructor () {
    // create an instance from axios module and customize it
    this.axios = axios.create({
      baseURL: constants.api.baseURL
    })
  }
  /**
   * add authorization header to axios's request headers
   *
   * @param {string} token
   * @memberof Github
   */
  setToken (token: string): void {
    this.axios.interceptors.request.use(config => {
      config.headers['Authorization'] = `token ${token}`

      return config
    })
    this.token = token
  }
  /**
   * return an promise request object which return starred gists of user.
   * In other words, this method act like a ping method which helps to
   * understand Github OAuth token is valid or not
   *
   * @returns {AxiosPromise}
   * @memberof Github
   */
  ping (): AxiosPromise {
    return this.axios.get('/gists/starred')
  }
}
