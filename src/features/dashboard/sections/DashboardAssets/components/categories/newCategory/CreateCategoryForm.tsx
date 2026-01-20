import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateCategory, useRestoreCategory } from '../../../hooks/categories'
import SubmitButton from '../../../../../../../components/ui/submit-button'
import { useAssetCategoriesStore } from '../../../../../../../app/store/admin/categoriesTab.store'
import { queryClient } from '../../../../../../../api/config/queryClient'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertCircle, RotateCcw } from 'lucide-react'
import { useState } from 'react'
import { categoryServices } from '../../../services/category'

const formSchema = z.object({
   name: z.string().min(2, {
      message: 'Category name must be at least 2 characters.',
   }),
   description: z.string().nonempty({
      message: 'Description required',
   }),
})

export function CreateCategoryForm() {
   const router = useNavigate()
   const { addCategory } = useAssetCategoriesStore()
   const { mutate, isPending, isSuccess } = useCreateCategory()
   const { mutate: restore, isPending: isRestoring } = useRestoreCategory()
   const [conflictingId, setConflictingId] = useState<string | null>(null)

   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
   })

   const handleRestore = () => {
      if (!conflictingId) return
      restore(
         { id: conflictingId },
         {
            onSuccess: () => {
               toast.success('Category restored successfully.')
               queryClient.invalidateQueries({ queryKey: ['categories'] })
               router('/dashboard/assets?tab=categories')
            },
            onError: () => {
               toast.error('Failed to restore category.')
            },
         },
      )
   }

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      setConflictingId(null) // Reset on new attempt
      mutate(
         { name: values.name, description: values.description },
         {
            onSuccess: (data) => {
               addCategory(data.data.data.category)
               console.log(data)
               queryClient.invalidateQueries({ queryKey: ['categories'] })

               toast.success('Category created successfully.')

               router('/dashboard/assets?tab=categories')
            },
            onError: async (error) => {
               if (error.response?.status === 409) {
                  const errorMessage = error.response?.data?.message || ''
                  const isDeleted = errorMessage.toLowerCase().includes('deleted')

                  if (isDeleted) {
                     // Try to find the deleted category to get its ID
                     try {
                        const res = await categoryServices.getCategories({
                           page: 1,
                           limit: 1,
                           query: values.name,
                           status: 'deleted',
                        })
                        const found = res.data.data.categories.find(
                           (c) => c.name.toLowerCase() === values.name.toLowerCase(),
                        )
                        if (found) {
                           setConflictingId(found.id)
                           const message =
                              "Category already exists but is deleted. Click 'Restore' to recover it."
                           form.setError('root', {
                              type: 'manual',
                              message: message,
                           })
                           return
                        }
                     } catch (e) {
                        console.error('Failed to fetch deleted category details', e)
                     }
                  }

                  const message = 'A category with this name already exists.'
                  form.setError('name', {
                     type: 'manual',
                     message: message,
                  })
                  if (!form.formState.errors.root) {
                     form.setError('root', {
                        type: 'manual',
                        message: message,
                     })
                  }
                  return
               }
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
            <h1 className="text-3xl font-bold tracking-tight">Create New Category</h1>
            <p className="text-muted-foreground text-lg">
               Fill in the details for your new asset category
            </p>
         </div>

         <div className="space-y-8">
            {form.formState.errors.root && (
               <Alert variant="destructive" className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                     <AlertCircle className="h-4 w-4" />
                     <div>
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{form.formState.errors.root.message}</AlertDescription>
                     </div>
                  </div>
                  {conflictingId && (
                     <Button
                        size="sm"
                        variant="outline"
                        className="bg-white text-destructive border-destructive hover:bg-destructive/10"
                        onClick={handleRestore}
                        disabled={isRestoring}
                     >
                        {isRestoring ? (
                           'Restoring...'
                        ) : (
                           <>
                              <RotateCcw className="mr-2 h-4 w-4" />
                              Restore Category
                           </>
                        )}
                     </Button>
                  )}
               </Alert>
            )}
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
                        placeholder="Describe what this category is used for..."
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
                     Create Category
                  </SubmitButton>
               </div>
            </form>
         </div>
      </div>
   )
}
