export interface ILogger {
  log: (...messages: string[]) => void
  error: (...messages: string[]) => void
}
