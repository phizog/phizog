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
