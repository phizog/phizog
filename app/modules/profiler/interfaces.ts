export type TProfile = {
  user_type: 'guest' | 'authorized'
  token: string
  gistId?: string
  lastSyncDate?: Date
}

export interface IProfiler {
  data: TProfile
  path: string
  load: () => boolean
  save: () => boolean
  isValidate: (data: TProfile) => data is TProfile
  authorizeRequest: () => Promise<void>
}
