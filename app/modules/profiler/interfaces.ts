import { Github } from '../github'

export type TProfile = {
  user_type: 'guest' | 'authorized'
  token: string
  gistId?: string
  lastSyncDate?: Date
}

export interface IProfiler {
  data: TProfile
  path: string
  github: Github
  load: () => boolean
  save: () => boolean
  isValid: (data: TProfile) => data is TProfile
  pingtoken: () => Promise<void>
  authorizeRequest: () => Promise<void>
}
