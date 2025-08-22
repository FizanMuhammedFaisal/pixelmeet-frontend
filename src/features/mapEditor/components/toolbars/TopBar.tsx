import { ThemeToggle } from '@/shared/layout/Dashboard/ThemeButton'
import type { ThemeType } from '../../types/types'
import { Button } from '@/components/ui/button'
import { Save } from 'lucide-react'
import { useEditorActions, useMapEditorStore } from '@/app/store/mapEditor/mapEditor'
import { useCreateAsset, useGetPresignedURL, useUploadAsset } from '@/shared/hooks/upload'
import { toast } from 'sonner'

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
   const { exportMap } = useEditorActions()
   const getPresignedMutation = useGetPresignedURL()
   const uploadMutation = useUploadAsset()
   const createAssetMutation = useCreateAsset()
   const handleSave = async () => {
      const map = exportMap()
      console.log(map)
      const copy = map
      console.log(copy)
      const encoder = new TextEncoder()
      const size = encoder.encode(JSON.stringify(copy)).length
      const name = useMapEditorStore.getState().mapName
      let urldata: {
         url: string
         mimeType: string
         assetKey: string
      } | null = null
      try {
         const res = await getPresignedMutation.mutateAsync({
            fileName: name,
            type: 'tilemapTiledJSON',
         })
         urldata = res.data.data
      } catch (error) {
         toast.error('Saving Map Failed. Try Again')
      }
      if (!urldata) {
         return toast.error('Saving Map Failed. Try Again')
      }
      try {
         await uploadMutation.mutateAsync({
            contentType: urldata.mimeType,
            file: map as unknown as File,
            url: urldata.url,
         })
      } catch (error) {
         toast.error('Saving Map Failed. Try Again')
      }
      try {
         createAssetMutation.mutate(
            {
               size: size,
               description: 'Mapd',
               metadata: { urlKey: urldata.assetKey },
               name: name,
               type: 'tilemapTiledJSON',
            },
            {
               onSuccess: () => {
                  toast.success('Map Saved')
               },
            },
         )
      } catch (error) {
         toast.error('Saving Map Failed. Try Again')
      }

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
