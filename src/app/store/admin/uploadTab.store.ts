import { create } from 'zustand';
import type { AssetType, UploadFile } from '../../../features/dashboard/types';

export type UpdateFileInput =
  | Partial<Extract<UploadFile, { type: 'image' }>>
  | Partial<Extract<UploadFile, { type: 'audio' }>>
  | Partial<Extract<UploadFile, { type: 'spritesheet' }>>
  | Partial<Extract<UploadFile, { type: 'tilemapTiledJSON' }>>;

interface UploadState {
  files: UploadFile[];
  addFile: (file: File) => void;
  updateFile: (id: string, updates: UpdateFileInput) => void;
  removeFile: (id: string) => void;
  clearAllFiles: () => void;
  getFile: (id: string) => UploadFile | undefined;
}
//need to fix teh logic
export function inferFileType(file: File): AssetType {
  const { type, name } = file;

  if (type.startsWith('image/')) {
    return 'image';
  }

  if (type.startsWith('audio/')) {
    return 'audio';
  }

  if (type === 'application/json') {
    if (name.endsWith('.tilemap') || name.endsWith('.tilemap.json') || name.endsWith('.json')) {
      return 'tilemapTiledJSON'; // be more specific if you can
    }

    return 'spritesheet'; // maybe your app uses .json for spritesheets
  }

  return 'unknown';
}

export const useUploadTabStore = create<UploadState>()((set, get) => ({
  files: [],
  addFile(file) {
    const id = crypto.randomUUID();
    const previewUrl =
      file.type.startsWith('image/') || file.type.startsWith('audio/')
        ? URL.createObjectURL(file)
        : undefined;
    const filetype = inferFileType(file) as AssetType;
    const size = file.size;
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
      metadata: null,
    } as UploadFile;

    set((state) => ({
      files: [...state.files, newFile],
    }));
  },

  updateFile(id, updates) {
    console.log(updates);
    set((state) => ({
      files: state.files.map((f) => {
        if (f.id !== id) return f;

        if (f.type === 'image' && updates.type === 'image') {
          return {
            ...f,
            ...updates,
            type: 'image',
            metadata: { ...f.metadata, ...updates.metadata },
          };
        }

        if (f.type === 'audio' && updates.type === 'audio') {
          return {
            ...f,
            ...updates,
            type: 'audio',
            metadata: { ...f.metadata, ...updates.metadata },
          };
        }

        if (f.type === 'spritesheet' && updates.type === 'spritesheet') {
          return {
            ...f,
            ...updates,
            type: 'spritesheet',
            metadata: {
              ...f.metadata,
              ...updates.metadata,
              frameConfig: {
                ...f.metadata?.frameConfig,
                ...updates.metadata?.frameConfig,
              },
            },
          };
        }
        if (f.type === 'tilemapTiledJSON' && updates.type === 'tilemapTiledJSON') {
          return {
            ...f,
            ...updates,
            type: 'tilemapTiledJSON',
            metadata: {
              ...f.metadata,
              ...updates.metadata,
            },
          };
        }
        if ('type' in updates && updates.type && updates.type !== f.type) {
          return {
            ...f,
            ...updates,
            metadata: null,
          };
        }
        return { ...f, ...updates, metadata: null };
      }),
    }));
  },
  removeFile(id) {
    set((state) => ({
      files: state.files.filter((f) => f.id !== id),
    }));
  },
  clearAllFiles() {
    set({ files: [] });
  },
  getFile: (id) => {
    return get().files.find((f) => f.id === id);
  },
}));
