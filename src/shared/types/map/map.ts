export interface Map {
   readonly id: string
   readonly name: string
   manifestId: string
   description?: string
   isTemplate: boolean
   forkedFrom?: string
   createdBy: string
   isPublic: boolean
   category?: string
   previewImageUrl: string
   createdAt: Date
   updatedAt: Date
}
