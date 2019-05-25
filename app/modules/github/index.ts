import axios, { AxiosInstance, AxiosPromise, AxiosResponse } from 'axios'
import { constants, meta, oauth } from '../constants'
import { IGithub, IFile } from './interfaces'
import { queryString } from '../util'

export class Github implements IGithub {
  /**
   * Creates an instance of Github.
   * @memberof Github
   */
  token: string
  axios: AxiosInstance
  constructor() {
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
  setToken(token: string): void {
    this.axios.interceptors.request.use(config => {
      config.headers['Authorization'] = token

      return config
    })
    this.token = token
  }
  /**
   * return a promise request object which return starred gists of user.
   * In other words, this method act like a ping method which helps to
   * understand Github OAuth token is valid or not
   *
   * @returns {AxiosPromise}
   * @memberof Github
   */
  ping(): AxiosPromise {
    return this.axios.get('/gists/starred')
  }
  /**
   * return a promise POST request object which will create new gist according
   * to the passed files object
   *
   * @param {IFile} files
   * @returns {AxiosPromise}
   * @memberof Github
   */
  createGist(files: IFile): AxiosPromise {
    return this.axios.post('/gists', gistBodyCreator(files))
  }
  /**
   * return a promise GET request object which will download the specifid gist
   *
   * @param {string} id
   * @returns {AxiosPromise}
   * @memberof Github
   */
  downloadGist(id?: string): AxiosPromise {
    if (id) return this.axios.get(`/gists/${id}`)
    else return this.findGist()
  }
  /**
   * return a promise DELETE request object which will delete the specifid gist
   *
   * @param {string} id
   * @returns {AxiosPromise}
   * @memberof Github
   */
  deleteGist(id: string): AxiosPromise {
    return this.axios.delete(`/gists/${id}`)
  }
  /**
   * return a promise PATCH request object which will update the specifid gist
   *
   * @param {string} id
   * @param {IFile} files
   * @returns {AxiosPromise}
   * @memberof Github
   */
  updateGist(id: string, files: IFile): AxiosPromise {
    return this.axios.patch(`/gists/${id}`, gistBodyCreator(files))
  }
  /**
   * finding phizog's profile gist in list of user's gists. this method use
   * recursive concept to search between gists.
   *
   * @param {number} page
   * @returns {Promise}
   * @memberof Github
   */
  findGist(page: number = 1): Promise<any> {
    return new Promise((resolve, reject) => {
      this.axios
        .get(`/gists`, {
          params: {
            per_page: 100,
            page: page
          }
        })
        .then(res => {
          this.gistExtractor(res)
            .then(res => resolve(res))
            .catch(err => reject(err))
        })
        .catch(err => {
          reject(err)
        })
    })
  }
  /**
   * recursive promise method which will iterate Github response data list and
   * resolve the specified gist object
   *
   * @param {AxiosResponse} res
   * @returns {Promise}
   * @memberof Github
   */
  gistExtractor(res: AxiosResponse): Promise<any> {
    return new Promise((resolve, reject) => {
      if (res.hasOwnProperty('data')) {
        for (const gist of res.data) {
          if (constants.profile.filename in gist['files']) {
            return resolve(gist)
          }
        }

        if ('link' in res.headers) {
          let pagination = parseLinkHeader(res.headers.link)

          if ('next' in pagination) {
            let url = new URL(pagination['next'])
            let nextPage: string | any = url.searchParams.get('page')

            this.findGist(parseInt(nextPage, 10))
              .then((res: AxiosResponse) => {
                this.gistExtractor(res)
                  .then(res => resolve(res))
                  .catch(err => reject(err))
              })
              .catch(err => reject(err))
          }
        }
      } else {
        return resolve(res)
      }
    })
  }
  exchanger(code: string): Promise<any> {
    return new Promise((resolve, reject) => {
      axios
        .get(oauth.exchanger)
        .then(response => {
          let params: Object = {
            code: code,
            redirect_uri: oauth.parameters.callback,
            client_id: oauth.parameters.client_id
          }
          resolve(axios.post(`${response.data.trim()}?${queryString(params)}`))
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

/**
 * prepare post body to create new gist
 *
 * @param {IFile} files
 * @returns {Object}
 */
const gistBodyCreator = (files: IFile) => ({
  public: false,
  description: `${meta.title} - Profile File`,
  files: files
})

/**
 * return pagination object
 *
 * @param {string} linksStr
 * @returns {Object}
 */
const parseLinkHeader: any = (linksStr: string) => {
  if (linksStr.length === 0) throw new Error('input must not be of zero length')

  let parts = linksStr.split(',')
  let links: any = {}

  for (let i = 0; i < parts.length; i++) {
    let section = parts[i].split(';')
    if (section.length !== 2) {
      throw new Error("section could not be split on ';'")
    }

    links[section[1].replace(/rel="(.*)"/, '$1').trim()] = section[0]
      .replace(/<(.*)>/, '$1')
      .trim()
  }
  return links
}
