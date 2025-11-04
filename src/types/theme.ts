export type ThemeType = 'light' | 'dark'

export interface ThemeConfig {
  primary: string
  secondary: string
  background: string
  foreground: string
}

export interface ThemePreference {
  theme: ThemeType
  autoSwitch: boolean
}
