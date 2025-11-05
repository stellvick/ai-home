import { http } from '../../http'

export interface LoginRequest {
  email: string
  senha: string
}

export interface LoginResponse {
  token: string
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  return http('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  })
}