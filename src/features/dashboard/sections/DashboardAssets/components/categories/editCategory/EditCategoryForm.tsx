import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useUpdateCategory } from '../../../hooks/categories'
import { Spinner } from '../../../../../../../components/ui/spinner'
import SubmitButton from '../../../../../../../components/ui/submit-button'
import { useAssetCategoriesStore } from '../../../../../../../app/store/admin/categoriesTab.store'
import { queryClient } from '../../../../../../../api/config/queryClient'
import { useGetCategory } from '../../../hooks/categories/useGetCategory'

const formSchema = z.object({
   id: z.string(),
   name: z.string().min(2, {
      message: 'Category name must be at least 2 characters.',
   }),
   description: z.string().optional(),
})

export function EditCategoryForm() {
   const router = useNavigate()
   const { id: categoryId } = useParams<{ id: string }>()
   const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
         id: categoryId,
         name: '',
         description: '',
      },
   })

   const { data: categoryData, isLoading, isError, error } = useGetCategory(categoryId!)
   const { editCategory } = useAssetCategoriesStore()
   const {
      mutate,
      isPending,
      isSuccess,
      isError: isMutationError,
      error: mutationError,
   } = useUpdateCategory()

   useEffect(() => {
      if (categoryData) {
         const category = categoryData.data.data
         console.log(category)
         form.reset({
            id: category.id,
            name: category.name,
            description: category.description,
         })
      }
   }, [categoryData, form])

   useEffect(() => {
      if (isSuccess) {
         toast.success('Category updated successfully.')
         router('/dashboard/assets?tab=categories')
      }
      if (isMutationError) {
         toast.error(mutationError?.message || 'Failed to update category.')
      }
   }, [isSuccess, isMutationError, mutationError, router, queryClient, categoryId])

   const onSubmit = (values: z.infer<typeof formSchema>) => {
      if (!categoryId) {
         toast.error('Category ID is missing.')
         return
      }
      mutate(
         { id: categoryId, name: values.name, description: values.description },
         {
            onSuccess: (data) => {
               editCategory(categoryId, data.data.category)
               queryClient.invalidateQueries({ queryKey: ['categories'] })
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
      return (
         <div className="text-center py-8 text-red-500">
            Error loading category: {error.message}
         </div>
      )
   }

   return (
      <div className="w-full max-w-3xl mx-auto p-10 space-y-8">
         <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Edit Category</h1>
            <p className="text-muted-foreground text-lg">
               Update the details for your asset category
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
                        placeholder="Optional description for the category"
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
                     onClick={() => router('/dashboard/assets?tab=categories')}
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
