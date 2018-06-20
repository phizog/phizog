import { Github } from './index'
import { IGithub } from './interfaces'
import { constants } from '../constants'
import { AxiosPromise } from 'axios'

describe('Github', () => {
  let instance: IGithub
  const token = '1234'

  it('should be instance of Github', () => {
    instance = new Github()
    expect(instance).toBeInstanceOf(Github)
  })

  it('should have a customized axios instance', () => {
    instance = new Github()
    expect(instance.axios.defaults.baseURL).toBe(constants.api.baseURL)
  })

  it('should have an authorization header', () => {
    instance = new Github()
    instance.setToken(token)
    expect(instance.token).toBe(token)
  })
})
