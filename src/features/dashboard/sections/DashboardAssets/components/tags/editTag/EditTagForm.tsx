import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetTag, useUpdateTag } from '../../../hooks'
import { Spinner } from '../../../../../../../components/ui/spinner'
import SubmitButton from '../../../../../../../components/ui/submit-button'
import { useAssetTagsStore } from '../../../../../../../app/store/admin/tagsTab.store'
import { queryClient } from '../../../../../../../api/config/queryClient'

// Define the Zod schema for form validation
const formSchema = z.object({
   id: z.string(),
   name: z.string().min(2, {
      message: 'Tag name must be at least 2 characters.',
   }),
   description: z.string().optional(),
})

export function EditTagForm() {
   const router = useNavigate()
   const { id: tagId } = useParams<{ id: string }>()
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         id: tagId,
         name: '',
         description: '',
      },
   })

   const { data: tagData, isLoading, isError, error } = useGetTag(tagId!)
   const { editTag } = useAssetTagsStore()
   const {
      mutate,
      isPending,
      isSuccess,
      isError: isMutationError,
      error: mutationError,
   } = useUpdateTag()

   useEffect(() => {
      if (tagData) {
         const tag = tagData.data.data
         console.log(tag)
         form.reset({
            id: tag.id,
            name: tag.name,
            description: tag.description,
         })
      }
   }, [tagData, form])

   useEffect(() => {
      if (isSuccess) {
         toast.success('Tag updated successfully.')

         router('/dashboard/assets?tab=tags')
      }
      if (isMutationError) {
         toast.error(mutationError?.message || 'Failed to update tag.')
      }
   }, [isSuccess, isMutationError, mutationError, router, queryClient, tagId])

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      if (!tagId) {
         toast.error('Tag ID is missing.')
         return
      }
      mutate(
         { id: tagId, name: values.name, description: values.description },
         {
            onSuccess: (data) => {
               editTag(tagId, data.data.tag)
               queryClient.invalidateQueries({ queryKey: ['tags'] })
            },
         },
      )
   }

   if (isLoading) {
      return (
         <div className="grow items-center justify-center z-50 ">
            <Spinner />
         </div>
      )
   }

   if (isError) {
      return <div className="text-center py-8 text-red-500">Error loading tag: {error.message}</div>
   }

   return (
      <div className="w-full max-w-3xl mx-auto p-10 space-y-8">
         <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Edit Tag</h1>
            <p className="text-muted-foreground text-lg">Update the details for your asset tag</p>
         </div>

         <div className="space-y-8">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
               <div className="space-y-4">
                  <div className="grid gap-2">
                     <Label htmlFor="name" className="text-base font-semibold">
                        Name
                     </Label>
                     <Input
                        id="name"
                        {...form.register('name')}
                        className="bg-background border-input focus:border-primary transition-colors h-12 text-base"
                        placeholder="e.g., Environment, Character, UI"
                     />
                     {form.formState.errors.name && (
                        <p className="text-red-500 text-sm mt-1 px-1">
                           {form.formState.errors.name.message}
                        </p>
                     )}
                  </div>

                  <div className="grid gap-2">
                     <Label htmlFor="description" className="text-base font-semibold">
                        Description
                     </Label>
                     <Textarea
                        id="description"
                        {...form.register('description')}
                        className="min-h-[150px] bg-background border-input focus:border-primary transition-colors resize-none p-4 text-base"
                        placeholder="Optional description for the tag"
                     />
                     {form.formState.errors.description && (
                        <p className="text-red-500 text-sm mt-1 px-1">
                           {form.formState.errors.description.message}
                        </p>
                     )}
                  </div>
               </div>

               <div className="flex items-center justify-end gap-3 pt-4">
                  <Button
                     type="button"
                     variant="ghost"
                     size="lg"
                     onClick={() => router('/dashboard/assets')}
                     className="text-muted-foreground hover:text-foreground"
                  >
                     Cancel
                  </Button>
                  <SubmitButton
                     processingName="Saving..."
                     isLoading={isPending}
                     isSuccess={isSuccess}
                     size="lg"
                     className="min-w-[140px]"
                  >
                     Save Changes
                  </SubmitButton>
               </div>
            </form>
         </div>
      </div>
   )
}
