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
import { createMapFormSchema, type CreateMapFormData } from '@/shared/schema'
import { useCreateMap } from '@/shared/hooks'
import useAuthStore from '@/app/store/auth.store'
import SubmitButton from '@/components/ui/submit-button'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Spinner } from '@/components/ui/spinner'
import { usePaginatedCategories } from '../../../DashboardAssets/hooks/categories'

export function CreateMapForm() {
   const { user } = useAuthStore((state) => state)
   const [isLoading, setIsLoading] = useState(false)
   const { data: categoriesData, isLoading: isCategoriesLoading } = usePaginatedCategories(
      1,
      50,
      'active',
   )

   const categories = categoriesData?.data?.data?.categories || []

   const form = useForm<CreateMapFormData>({
      resolver: zodResolver(createMapFormSchema),
      defaultValues: {
         name: '',
         description: '',
         isTemplate: false,
         isPublic: false,
         category: '',
      },
   })
   const navigate = useNavigate()

   const createMapMutation = useCreateMap()

   const submit: SubmitHandler<CreateMapFormData> = async (data) => {
      setIsLoading(true)

      try {
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
      <div className="w-full max-w-3xl mx-auto p-10 space-y-8">
         <div className="space-y-2">
            <p className="text-muted-foreground text-lg">
               Fill in the details below to create a new map entry.
            </p>
         </div>

         <div className="space-y-8">
            <Form {...form}>
               <form
                  onSubmit={form.handleSubmit(submit, (error) => console.log(error))}
                  className="space-y-6"
               >
                  <div className="space-y-4">
                     <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-base font-semibold">Map Name</FormLabel>
                              <FormControl>
                                 <Input
                                    placeholder="e.g., Downtown City Map"
                                    className="bg-background border-input focus:border-primary transition-colors h-12 text-base"
                                    {...field}
                                 />
                              </FormControl>
                              <FormDescription className="text-sm text-muted-foreground px-1">
                                 This is the public name of your map.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                           <FormItem>
                              <FormLabel className="text-base font-semibold">Description</FormLabel>
                              <FormControl>
                                 <Textarea
                                    placeholder="A brief description of your map's content and purpose."
                                    className="min-h-[150px] bg-background border-input focus:border-primary transition-colors resize-none p-4 text-base"
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
                              <FormLabel className="text-base font-semibold">Category</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                 <FormControl>
                                    <SelectTrigger className="bg-background border-input focus:border-primary transition-colors h-12 text-base">
                                       <SelectValue placeholder="Select a category" />
                                    </SelectTrigger>
                                 </FormControl>
                                 <SelectContent>
                                    {isCategoriesLoading ? (
                                       <div className="flex items-center justify-center p-2">
                                          <Spinner size="sm" />
                                       </div>
                                    ) : (
                                       categories.map((category) => (
                                          <SelectItem key={category.id} value={category.name}>
                                             {category.name}
                                          </SelectItem>
                                       ))
                                    )}
                                 </SelectContent>
                              </Select>
                              <FormDescription className="text-sm text-muted-foreground px-1">
                                 Categorize your map for easier discovery.
                              </FormDescription>
                              <FormMessage />
                           </FormItem>
                        )}
                     />

                     <div className="grid grid-cols-2 gap-4">
                        <FormField
                           control={form.control}
                           name="isPublic"
                           render={({ field }) => (
                              <FormItem>
                                 <label className="flex flex-col gap-3 p-5 border border-border rounded-base bg-card hover:border-primary/50 transition-colors cursor-pointer">
                                    <div className="flex items-start gap-3">
                                       <FormControl>
                                          <Checkbox
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                             className="mt-0.5"
                                          />
                                       </FormControl>
                                       <div className="flex-1 space-y-1">
                                          <div className="text-base font-semibold">Public Map</div>
                                          <FormDescription className="text-sm text-muted-foreground leading-snug">
                                             Allow other users to view and use this map.
                                          </FormDescription>
                                       </div>
                                    </div>
                                 </label>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />

                        <FormField
                           control={form.control}
                           name="isTemplate"
                           render={({ field }) => (
                              <FormItem>
                                 <label className="flex flex-col gap-3 p-5 border border-border rounded-base bg-card hover:border-primary/50 transition-colors cursor-pointer">
                                    <div className="flex items-start gap-3">
                                       <FormControl>
                                          <Checkbox
                                             checked={field.value}
                                             onCheckedChange={field.onChange}
                                             className="mt-0.5"
                                          />
                                       </FormControl>
                                       <div className="flex-1 space-y-1">
                                          <div className="text-base font-semibold">Is Template</div>
                                          <FormDescription className="text-sm text-muted-foreground leading-snug">
                                             Mark this map as a template for new creations.
                                          </FormDescription>
                                       </div>
                                    </div>
                                 </label>
                                 <FormMessage />
                              </FormItem>
                           )}
                        />
                     </div>
                  </div>

                  <div className="flex items-center justify-end gap-3 pt-4">
                     <SubmitButton
                        type="submit"
                        variant="special"
                        isLoading={isLoading}
                        processingName="Creating"
                        size="lg"
                        className="min-w-[140px]"
                     >
                        Create Map
                     </SubmitButton>
                  </div>
               </form>
            </Form>
         </div>
      </div>
   )
}
