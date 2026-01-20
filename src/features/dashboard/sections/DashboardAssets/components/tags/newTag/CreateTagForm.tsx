import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTag } from '../../../hooks/'
import SubmitButton from '../../../../../../../components/ui/submit-button'
import { useAssetTagsStore } from '../../../../../../../app/store/admin/tagsTab.store'
import { queryClient } from '../../../../../../../api/config/queryClient'

const formSchema = z.object({
   name: z.string().min(2, {
      message: 'Tag name must be at least 2 characters.',
   }),
   description: z.string().nonempty({
      message: 'Description required',
   }),
})

export function CreateTagForm() {
   const router = useNavigate()
   const { addTag } = useAssetTagsStore()
   const { mutate, isPending, isSuccess } = useCreateTag()

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
   })

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      mutate(
         { name: values.name, description: values.description },
         {
            onSuccess: (data) => {
               addTag(data.data.data.tag)
               console.log(data)
               queryClient.invalidateQueries({ queryKey: ['tags'] })

               toast.success('Tag created successfully.')

               router('/dashboard/assets?tab=tags')
            },
            onError: (error) => {
               const firstDetail = error.response?.data?.issues?.[0]?.message
               const fallback = error.response?.data?.message || 'Something went wrong Try Again'

               toast.error(firstDetail || fallback)
            },
         },
      )
   }

   return (
      <div className="w-full max-w-3xl mx-auto p-10 space-y-8">
         <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Create New Tag</h1>
            <p className="text-muted-foreground text-lg">
               Fill in the details for your new asset tag
            </p>
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
                        placeholder="Describe what this tag is used for..."
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
                     processingName="Creating"
                     isLoading={isPending}
                     isSuccess={isSuccess}
                     size="lg"
                     className="min-w-[140px]"
                  >
                     Create Tag
                  </SubmitButton>
               </div>
            </form>
         </div>
      </div>
   )
}
