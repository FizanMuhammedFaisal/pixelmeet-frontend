export interface Layer {
   id: string
   name: string
   visible: boolean
   locked: boolean
}

export type LayerDirection = 'up' | 'down'
export type ThemeType = 'light' | 'dark'

export type EmitterType = {
   switchTheme: { theme: ThemeType }
}
