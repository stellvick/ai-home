// Mock auth
const mockUser = {
  email: 'test@example.com',
  senha: 'password',
  token: 'mock-jwt-token-12345'
}

export interface LoginRequest {
  email: string
  senha: string
}

export interface LoginResponse {
  token: string
}

export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  if (data.email === mockUser.email && data.senha === mockUser.senha) {
    return { token: mockUser.token }
  }
  throw new Error('Invalid credentials')
}