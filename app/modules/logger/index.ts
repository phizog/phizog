import { ILogger } from './interfaces'

const isWindow = () => !!window
const isGlobal = () => !!global

let logger: ILogger = {
  log (...messages) {
    messages.forEach((msg: string) => process.stdin.write(msg))
  },
  error (...messages) {
    messages.forEach((msg: string) => process.stderr.write(msg))
  }
}

// If in browser, use window.console
if (isWindow()) {
  logger = window.console
} else if (isGlobal()) {
  logger = global.console
}

export const phizogLogger = logger
