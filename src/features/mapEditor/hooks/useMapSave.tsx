import { toast } from 'sonner'
import { useEditorActions, useMapEditorStore } from '@/app/store/mapEditor/mapEditor'
import { useCreateAsset, useGetPresignedURL, useUploadAsset } from '@/shared/hooks/upload'
import { useUpdateMap } from '@/shared/hooks/maps/useUpdateMap'
import type { ErrorResponse } from '@/shared/types'
import type { AxiosError } from 'axios'

export function useMapSave() {
   const { exportMap, exportManifest, updateMapDetails } = useEditorActions()
   const mapDetails = useMapEditorStore((state) => state.mapDetails)

   const getPresignedMutation = useGetPresignedURL()
   const uploadMutation = useUploadAsset()
   const createAssetMutation = useCreateAsset()
   const updateMapMutation = useUpdateMap()

   const isSaving =
      getPresignedMutation.isPending ||
      uploadMutation.isPending ||
      createAssetMutation.isPending ||
      updateMapMutation.isPending

   const saveMap = async () => {
      if (!mapDetails) {
         toast.error('Map details are not loaded. Try Adding it or refresh')
         return
      }

      try {
         const mapData = exportMap()
         const mapJsonString = JSON.stringify(mapData)
         const encoder = new TextEncoder()
         const mapFileSize = encoder.encode(mapJsonString).length
         const jsonName = `${mapDetails.id}.json`

         const { data: presignedUrlData } = await getPresignedMutation.mutateAsync({
            fileName: jsonName,
            type: 'tilemapTiledJSON',
            id: mapDetails.manifest.tileMapId,
         })
         const { url, mimeType, assetKey } = presignedUrlData.data

         const mapFile = new File([mapJsonString], jsonName, { type: mimeType })
         await uploadMutation.mutateAsync({
            contentType: mimeType,
            file: mapFile,
            url: url,
         })

         let assetId: string
         if (mapDetails.manifest.tileMapId) {
            assetId = mapDetails.manifest.tileMapId
         } else {
            const { data: newAssetData } = await createAssetMutation.mutateAsync({
               size: mapFileSize,
               metadata: { urlKey: assetKey },
               name: jsonName,
               type: 'tilemapTiledJSON',
            })
            assetId = newAssetData.data.asset.id
         }

         const manifest = exportManifest(assetKey)
         const { data: updatedMapData } = await updateMapMutation.mutateAsync({
            ...mapDetails,
            manifest: {
               tileMapId: assetId,
               manifestData: manifest,
               id: mapDetails.manifest.id,
            },
         })

         updateMapDetails(updatedMapData.data.map)
         toast.success('Map saved successfully!')
      } catch (errorc) {
         const error = errorc as AxiosError<ErrorResponse>
         const firstDetail = error.response?.data?.issues?.[0]?.message
         const fallback = error.response?.data?.message || 'Saving map failed. Please try again.'
         toast.error(firstDetail || fallback)
      }
   }

   return { saveMap, isSaving }
}
