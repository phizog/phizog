const constants = require('./constants')
const { existsSync, readFile, writeFile } = require('fs')
const joi = require('joi')

const profileDataSchema = {
  user_type: joi.string().required(),
  token: joi.string().allow('', null),
  gistId: joi.string().allow('', null)
}

/**
 * Profiler class helps to create an instance of existing profile or
 * logged in user and expose it as an global object to the electron app
 *
 * @class Profiler
 */
class Profiler {
  /**
   * Creates an instance of Profiler.
   * @param {object} [data={}]
   * @memberof Profiler
   */
  constructor (data = {}) {
    this.path = constants.profilePath
    this.data = data ? joi.validate(data, profileDataSchema).error === null ? data : new Error('data parameter isn\'t valid.') : {}

    if (!existsSync(this.path)) {
      this.create()
    } else {
      this.load()
    }
  }
  /**
   * Create profile file according profile template and passed parameters to
   * profiler instance.
   *
   * @memberof Profiler
   * @returns {boolean} file created or not
   */
  create () {
    try {
      // load profile template
      readFile(constants.profileTemplatePath, 'utf8', (error, data) => {
        if (error) throw error

        // modify template
        let template = JSON.parse(data)
        template['user_type'] = 'guest'
        template['token'] = ''
        template['gistId'] = ''

        // write modified template
        writeFile(this.path, JSON.stringify(template), (error) => {
          if (error) throw error
          this.data = template
          return true
        })
      })
    } catch (error) {
      throw error
    }
  }
  load () {
    // load profile file
    readFile(this.path, 'utf8', (error, data) => {
      if (error) throw error

      this.data = JSON.parse(data)
    })
  }
}

module.exports = Profiler
