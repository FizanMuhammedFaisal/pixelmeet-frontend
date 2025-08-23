import { ThemeToggle } from '@/shared/layout/Dashboard/ThemeButton'
import type { ThemeType } from '../../types/types'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useEditorActions, useMapEditorStore } from '@/app/store/mapEditor/mapEditor'
import { useCreateAsset, useGetPresignedURL, useUploadAsset } from '@/shared/hooks/upload'
import { toast } from 'sonner'
import { useUpdateMap } from '@/shared/hooks/maps/useUpdateMap'

type props = {
   className?: string
   setTheme: (theme: ThemeType) => void
}
function TopBar({ className, setTheme }: props) {
   const handleOnThemeChange = (theme: string) => {
      if (theme === 'light') {
         setTheme('dark')
      } else {
         setTheme('light')
      }
   }
   const { exportMap, exportManifest, updateMapDetails } = useEditorActions()
   const getPresignedMutation = useGetPresignedURL()
   const uploadMutation = useUploadAsset()
   const createAssetMutation = useCreateAsset()

   const updateMapMutation = useUpdateMap()
   const handleSave = async () => {
      const map = exportMap()
      const copy = map
      console.log(copy)
      const encoder = new TextEncoder()
      const size = encoder.encode(JSON.stringify(copy)).length
      const mapDetails = useMapEditorStore.getState().mapDetails
      console.log(mapDetails)
      if (!mapDetails) {
         return toast.error('Make sure to have details of the map filled in')
      }
      const jsonName = `${mapDetails.id}.json`
      console.log(jsonName)
      let urldata: {
         url: string
         mimeType: string
         assetKey: string
      } | null = null
      try {
         const res = await getPresignedMutation.mutateAsync({
            fileName: jsonName,
            type: 'tilemapTiledJSON',
            id: mapDetails.manifest.tileMapId ? mapDetails.manifest.tileMapId : undefined,
         })
         urldata = res.data.data
      } catch (error) {
         toast.error('Saving Map Failed. Try Again')
      }
      if (!urldata) {
         return toast.error('Saving Map Failed. Try Again')
      }
      const manifest = exportManifest(urldata.assetKey)
      try {
         await uploadMutation.mutateAsync({
            contentType: urldata.mimeType,
            file: map as unknown as File,
            url: urldata.url,
         })
      } catch (error) {
         toast.error('Saving Map Failed. Try Again')
      }
      let assetData
      try {
         assetData = await createAssetMutation.mutateAsync({
            size: size,
            metadata: { urlKey: urldata.assetKey },
            name: jsonName,
            type: 'tilemapTiledJSON',
         })
      } catch (error) {
         toast.error('Saving Map Failed. Try Again')
      }
      console.log(assetData)
      if (!assetData) {
         throw Error("Could't create asset")
      }
      console.log(manifest)
      updateMapMutation.mutate(
         {
            ...mapDetails,
            manifest: {
               tileMapId: mapDetails.manifest.tileMapId
                  ? mapDetails.manifest.tileMapId
                  : assetData.data.data.asset.id,
               manifestData: manifest,
               id: mapDetails.manifest.id,
            },
         },
         {
            onSuccess: (data) => {
               toast.success('Map Saved Succesfully.')
               updateMapDetails({
                  ...data.data.data.map,
               })
            },
            onError: (error) => {
               const firstDetail = error.response?.data?.issues?.[0]?.message
               const fallback = error.response?.data?.message || 'Something went wrong Try Again'

               toast.error(firstDetail || fallback)
            },
         },
      )

      console.log(JSON.stringify(map))
   }
   return (
      <div className={`dark:bg-muted bg-white flex z-10 w-full p-2 justify-between ${className}`}>
         <div>
            <Button onClick={() => handleSave()}>
               <span>Save</span>
               <Save />
            </Button>
         </div>
         <ThemeToggle onThemeChange={handleOnThemeChange} speed={0.5} />
      </div>
   )
}

export default TopBar
