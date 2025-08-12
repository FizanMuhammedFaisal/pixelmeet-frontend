export interface Layer {
   id: string
   name: string
   visible: boolean
   locked: boolean
}

export type LayerDirection = 'up' | 'down'
export type ThemeType = 'light' | 'dark'
export type ControlTools =
   | 'lock'
   | 'select'
   | 'hand'
   | 'fill'
   | 'rectangle-fill'
   | 'eraser'
   | 'zoom-in'
   | 'zoom-out'

export type EmitterType = {
   switchTheme: { theme: ThemeType }
   changeTool: { tool: ControlTools }
}
