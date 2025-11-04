const encryptStorage = {
  setItem: (key: string, value: string) => {
    localStorage.setItem(`@aihome:${key}`, btoa(value))
  },
  getItem: (key: string): string | null => {
    const value = localStorage.getItem(`@aihome:${key}`)
    return value ? atob(value) : null
  },
  removeItem: (key: string) => {
    localStorage.removeItem(`@aihome:${key}`)
  },
  clear: () => {
    const keys = Object.keys(localStorage)
    keys.forEach((key) => {
      if (key.startsWith('@aihome:')) {
        localStorage.removeItem(key)
      }
    })
  },
}

export const storage = {
  setJWT: (token: string) => {
    encryptStorage.setItem('jwt', token)
  },
  getJWT: (): string | null => {
    return encryptStorage.getItem('jwt')
  },
  removeJWT: () => {
    encryptStorage.removeItem('jwt')
  },
  clear: () => {
    encryptStorage.clear()
  },
}
