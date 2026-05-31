import { User } from "@/models/user.model"

export interface LoginData {
  user: User
  token: string
  token_type: string
}
