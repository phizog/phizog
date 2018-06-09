export interface Profile {
  user_type: 'guest' | 'authorized'
  token: string
  gistId?: string
  lastSyncDate?: Date
}
