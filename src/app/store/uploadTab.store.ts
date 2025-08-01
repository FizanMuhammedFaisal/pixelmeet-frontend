import { create } from 'zustand'
import type {
  AssetType,
  AudioMetadata,
  ImageMetadata,
  SpriteSheetMetadata,
  UploadFile
} from '../../features/dashboard/types/uploadTab'

// import { get, set, del } from 'idb-keyval'

// const idbStorage = {
//   getItem: async (name: string) => (await get(name)) ?? null,
//   setItem: async (name: string, value: any) => {
//     await set(name, value)
//   },
//   removeItem: async (name: string) => {
//     await del(name)
//   }
// }
interface UploadState {
  files: UploadFile[]
  addFile: (file: File) => void
  updateFile: (id: string, updates: Partial<UploadFile>) => void
  removeFile: (id: string) => void
}
//need to fix teh logic
const inferFileType = (file: File) => {
  return 'image'
}

export const useUploadTabStore = create<UploadState>()((set, get) => ({
  files: [],
  addFile(file) {
    const id = crypto.randomUUID()
    const previewUrl =
      file.type.startsWith('image/') || file.type.startsWith('audio/')
        ? URL.createObjectURL(file)
        : undefined
    const filetype = inferFileType(file) as AssetType
    const size = file.size
    const newFile: UploadFile = {
      id,
      previewUrl,
      name: file.name,
      size,
      file: file,
      type: filetype,
      uploadStatus: 'pending',
      error: undefined,
      urlKey: null,
      metadata: null
    } as UploadFile

    set(state => ({
      files: [...state.files, newFile]
    }))
  },
  updateFile(id, updates) {
    set(state => ({
      files: state.files.map(f => {
        if (f.id !== id) return f

        if (f.type === 'image') {
          return {
            ...f,
            ...updates,
            type: 'image',
            metadata: (updates.metadata ?? f.metadata) as ImageMetadata | null
          }
        }

        if (f.type === 'audio') {
          return {
            ...f,
            ...updates,
            type: 'audio',
            metadata: (updates.metadata ?? f.metadata) as AudioMetadata | null
          }
        }

        if (f.type === 'spritesheet') {
          return {
            ...f,
            ...updates,
            type: 'spritesheet',
            metadata: (updates.metadata ??
              f.metadata) as SpriteSheetMetadata | null
          }
        }

        return f
      })
    }))
  },
  removeFile(id) {
    set(state => ({
      files: state.files.filter(f => f.id !== id)
    }))
  }
}))

//   name: 'asset-upload-state',
//   storage: idbStorage
//   //   partialize: state => ({
//   //     files: state.files.map(file => ({
//   //       fileName: file.name,
//   //       fileSize: file.size,
//   //       type: file.type,
//   //       metadata: file.metadata,
//   //       status: file.uploadStatus
//   //     }))
//   //   })
