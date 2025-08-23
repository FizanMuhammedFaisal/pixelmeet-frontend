import type { Manifest } from '../manifest/manifest'

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
   previewImageUrl?: string
   createdAt: Date
   updatedAt: Date
}

export interface MapWithManifest {
   readonly id: string
   readonly name: string
   manifest: Manifest
   description?: string
   isTemplate: boolean
   forkedFrom?: string
   createdBy: string
   isPublic: boolean
   category?: string
   previewImageUrl?: string
   createdAt: Date
   updatedAt: Date
}
