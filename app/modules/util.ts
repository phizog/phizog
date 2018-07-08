/**
 * Seraialize custom messages to formated object
 *
 * @param {number} status
 * @param {*} data
 * @returns {object}
 */
export const messageSerializer: any = (status: number, data?: any) => ({
  status: status,
  data: data
})

export const queryString: any = (object: Object) =>
  Object.keys(object)
    .map(key => `${key}=${object[key]}`)
    .join('&')
