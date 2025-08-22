import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import {
   Form,
   FormControl,
   FormDescription,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { toast } from 'sonner'

const categories = [
   'Urban',
   'Nature',
   'Coastal',
   'Historical',
   'Residential',
   'Commercial',
   'Industrial',
   'Other',
]

import { createMapFormSchema, type CreateMapFormData } from '@/shared/schema'
import { ImageDropzone } from './createMap/FileDropZone'
import { useGetPresignedURL, useUploadAsset } from '../../DashboardAssets/hooks'
import { useCreateMap } from '@/shared/hooks'
import useAuthStore from '@/app/store/auth.store'
import SubmitButton from '@/components/ui/submit-button'
import { useState } from 'react'
import { useNavigate } from 'react-router'

export function CreateMapForm() {
   const { user } = useAuthStore((state) => state)
   const [isLoading, setIsLoading] = useState(false)

   const form = useForm<CreateMapFormData>({
      resolver: zodResolver(createMapFormSchema),
      defaultValues: {
         name: '',
         description: '',
         isTemplate: false,
         isPublic: false,
         category: '',
         previewImageFile: undefined,
      },
   })
   const navigate = useNavigate()
   //presignedurl hook

   const getPresignedURLMutation = useGetPresignedURL()
   const uploadAssetMutation = useUploadAsset()
   const createMapMutation = useCreateMap()

   const submit: SubmitHandler<CreateMapFormData> = async (data) => {
      setIsLoading(true)

      try {
         const presignedRes = await getPresignedURLMutation.mutateAsync({
            fileName: data.previewImageFile.name,
            type: 'image',
         })
         if (presignedRes.status !== 200) {
            setIsLoading(false)
            toast.error(`Couldn't create Map ${data.name}`)
         }

         const uploadRes = await uploadAssetMutation.mutateAsync({
            contentType: presignedRes.data.data.mimeType,
            file: data.previewImageFile,
            url: presignedRes.data.data.url,
         })
         if (uploadRes.status !== 200) {
            setIsLoading(false)
            return toast.error(`Couldn't create Map ${data.name}`)
         }
         console.log(user)
         if (!user) {
            setIsLoading(false)
            return toast.error(`Couldn't create Map, Try Logging in again`)
         }
         createMapMutation.mutate(
            {
               name: data.name,
               createdBy: user.id,
               description: data.description,
               isTemplate: data.isTemplate,
               category: data.category,
               previewImageUrl: presignedRes.data.data.assetKey,
               isPublic: data.isPublic,
            },
            {
               onSuccess: (data) => {
                  toast.success(`Map ${data.data.data.map.name} created`)
                  form.reset()
                  navigate('/dashboard/maps')
               },
               onError: (error) => {
                  const firstDetail = error.response?.data?.issues?.[0]?.message
                  const fallback = error.response?.data?.message || 'Something went wrong Try Again'
                  toast(firstDetail || fallback)
               },
               onSettled: () => {
                  setIsLoading(false)
               },
            },
         )
      } catch (error) {
         console.log(error)
      } finally {
         setIsLoading(false)
      }
   }

   return (
      <Card className="w-full max-w-2xl mx-auto">
         <CardHeader>
            <CardTitle className="text-2xl font-bold">Create New Map</CardTitle>
            <CardDescription>Fill in the details below to create a new map entry.</CardDescription>
         </CardHeader>
         <CardContent>
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(submit, (error) => console.log(error))}
                  className="space-y-6"
               >
                  <FormField
                     control={form.control}
                     name="name"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Map Name</FormLabel>
                           <FormControl>
                              <Input placeholder="e.g., Downtown City Map" {...field} />
                           </FormControl>
                           <FormDescription>This is the public name of your map.</FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="description"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Description</FormLabel>
                           <FormControl>
                              <Textarea
                                 placeholder="A brief description of your map's content and purpose."
                                 className="resize-y min-h-[80px]"
                                 {...field}
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="category"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Category</FormLabel>
                           <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                 <SelectTrigger>
                                    <SelectValue placeholder="Select a category" />
                                 </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                 {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                       {category}
                                    </SelectItem>
                                 ))}
                              </SelectContent>
                           </Select>
                           <FormDescription>
                              Categorize your map for easier discovery.
                           </FormDescription>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <FormField
                     control={form.control}
                     name="previewImageFile"
                     render={({ field }) => (
                        <FormItem>
                           <FormLabel>Preview Image</FormLabel>
                           <FormControl>
                              <ImageDropzone
                                 onFileChange={field.onChange}
                                 currentFile={field.value}
                                 description="Upload a preview image for your map (e.g., JPG, PNG, GIF, SVG, WebP)."
                              />
                           </FormControl>
                           <FormMessage />
                        </FormItem>
                     )}
                  />

                  <div className="flex items-center space-x-4">
                     <FormField
                        control={form.control}
                        name="isPublic"
                        render={({ field }) => (
                           <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm flex-1">
                              <FormControl>
                                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                 <FormLabel>Public Map</FormLabel>
                                 <FormDescription>
                                    Allow other users to view and use this map.
                                 </FormDescription>
                              </div>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="isTemplate"
                        render={({ field }) => (
                           <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm flex-1">
                              <FormControl>
                                 <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                 <FormLabel>Is Template</FormLabel>
                                 <FormDescription>
                                    Mark this map as a template for new creations.
                                 </FormDescription>
                              </div>
                              <FormMessage />
                           </FormItem>
                        )}
                     />
                  </div>

                  <SubmitButton
                     type="submit"
                     isLoading={isLoading}
                     processingName={'Creating Map'}
                     className="w-full"
                  >
                     Create Map
                  </SubmitButton>
               </form>
            </Form>
         </CardContent>
      </Card>
   )
}
