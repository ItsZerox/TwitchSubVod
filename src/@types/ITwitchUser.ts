export interface User {
  display_name: string
  _id: string
  name: string
  type: string
  bio?: any
  created_at: Date
  updated_at: Date
  logo: string
}

export interface ITwitchUser {
  _total: number
  users: User[]
}
