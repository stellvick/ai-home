import { EncryptStorage } from 'encrypt-storage'

const encryptStorage = new EncryptStorage('my-secret-key') // Use a proper key

export const authStorage = {
  getToken: () => encryptStorage.getItem('auth_token') as string | null,
  setToken: (token: string) => encryptStorage.setItem('auth_token', token),
  removeToken: () => encryptStorage.removeItem('auth_token'),
}