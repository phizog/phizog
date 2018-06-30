import { Github } from '../github'

export type TProfile = {
  user_type: 'guest' | 'authorized'
  token: string
  gistId?: string
  lastSyncDate?: Date
  skipLogin: boolean
}

export interface IProfiler {
  data: TProfile
  path: string
  github: Github
  load: () => boolean
  save: (data?: TProfile) => boolean
  isValid: (data: TProfile) => data is TProfile
  pingtoken: () => Promise<boolean>
  authorizeRequest: () => Promise<void>
}
