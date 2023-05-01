import { create } from 'zustand'

type Theme = 'dark' | 'light'

interface ConfigurationState {
  theme: Theme
  changeTheme: () => void
}

export const useConfigurationStore = create<ConfigurationState>((set, get) => {
  return {
    theme: 'dark',

    changeTheme: () => {
      const { theme } = get()
      const newTheme = theme === 'dark' ? 'light' : 'dark'

      set({ theme: newTheme })
    }
  }
})
