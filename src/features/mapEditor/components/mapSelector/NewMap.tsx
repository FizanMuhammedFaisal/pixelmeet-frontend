import useAuthStore from '@/app/store/auth.store'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useCreateMap } from '@/shared/hooks'
import type { Map } from '@/shared/types'
import { ArrowLeft, Check, MapIcon, Plus, Zap } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import {
   Form,
   FormControl,
   FormField,
   FormItem,
   FormLabel,
   FormMessage,
} from '@/components/ui/form'
import { useForm, type SubmitHandler } from 'react-hook-form'
import { createMapFormSchema, type CreateMapFormData } from '@/shared/schema'
import { Checkbox } from '@/components/ui/checkbox'
import SubmitButton from '@/components/ui/submit-button'
import { zodResolver } from '@hookform/resolvers/zod'
import { SuccessState } from '@/components/ui/succes-state'
type props = {
   setView: (view: string) => void
   handleStartBuilding: (id: string) => void
}
function NewMap({
   setView,

   handleStartBuilding,
}: props) {
   const [createSuccess, setCreateSuccess] = useState(false)
   const [map, setMap] = useState<Map | null>(null)
   const [isLoading, setIsLoading] = useState(false)
   const createMapMutation = useCreateMap()
   const form = useForm<CreateMapFormData>({
      resolver: zodResolver(createMapFormSchema),
      defaultValues: {
         isTemplate: false,
      },
   })

   const submit: SubmitHandler<CreateMapFormData> = (data) => {
      setIsLoading(true)
      const user = useAuthStore.getState().user
      if (!user) {
         return toast.error('Try Signing in again')
      }
      createMapMutation.mutate(
         {
            name: data.name,
            description: data.description,
            isTemplate: false,
            createdBy: user.id,
            isPublic: data.isPublic,
         },
         {
            onSuccess: (data) => {
               setCreateSuccess(true)
               setMap(data.data.data.map)
            },
            onError: (error) => {
               const firstDetail = error.response?.data?.issues?.[0]?.message
               const fallback = error.response?.data?.message || 'Something went wrong Try Again'

               toast.error(firstDetail || fallback)
            },
         },
      )
      setIsLoading(false)
   }
   return (
      <div className="fixed inset-0 z-50 bg-white/50 flex items-center justify-center p-5 h-full w-full  ">
         <div className="bg-background rounded-base shadow-2xl w-full  flex flex-col max-w-5/6 h-5/6">
            {!createSuccess ? (
               <>
                  <div className="px-8 py-6 border-b">
                     <div className="max-w-2xl mx-auto">
                        <div className="flex items-center gap-4 mb-4">
                           <div>
                              <h2 className="text-2xl font-bold">Create New Map</h2>
                              <p className="text-muted-foreground">Design your perfect 2D world</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="flex-1 overflow-y-auto bg-card flex items-center justify-center">
                     <div className="w-full max-w-lg h-full justify-center flex">
                        <div className=" w-full  p-8 ">
                           <div className="text-center mb-8">
                              <div className="w-16 h-16 bg-primary/10 rounded-base flex items-center justify-center mx-auto mb-4">
                                 <MapIcon className="h-8 w-8 text-primary" />
                              </div>
                              <h3 className="text-xl font-semibold mb-2">
                                 Let's Build Something Amazing
                              </h3>
                              <p className="text-muted-foreground text-sm">
                                 Every great world starts with a vision
                              </p>
                           </div>
                           <Form {...form}>
                              <form
                                 onSubmit={form.handleSubmit(submit, (e) => {
                                    console.log(e)
                                 })}
                                 className="space-y-6"
                                 id="crateMapForm"
                              >
                                 <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel>What's your world called?</FormLabel>
                                          <FormControl>
                                             <Input
                                                placeholder="e.g., Mystic Forest, Cyber City..."
                                                className="text-base h-12"
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />

                                 <FormField
                                    name="description"
                                    control={form.control}
                                    render={({ field }) => (
                                       <FormItem>
                                          <FormLabel className="text-sm font-medium">
                                             Tell us about your vision
                                          </FormLabel>
                                          <FormControl>
                                             <Textarea
                                                placeholder="A magical forest where adventurers gather to share stories and embark on quests..."
                                                {...field}
                                             />
                                          </FormControl>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />

                                 <FormField
                                    control={form.control}
                                    name="isPublic"
                                    render={({ field }) => (
                                       <FormItem className="flex items-center space-x-2">
                                          <FormControl>
                                             <Checkbox
                                                className="border-foreground/80"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                             />
                                          </FormControl>
                                          <FormLabel className="text-sm font-medium cursor-pointer">
                                             Do you want to make this a Public Map
                                          </FormLabel>
                                          <FormMessage />
                                       </FormItem>
                                    )}
                                 />
                                 <div className="border-t mt-15 bg-muted/30 px-8 py-4">
                                    <div className="max-w-2xl mx-auto flex items-center justify-between">
                                       <Button variant="outline" onClick={() => setView('intro')}>
                                          <ArrowLeft className="mr-2 h-4 w-4" />
                                          Go Back
                                       </Button>
                                       <SubmitButton
                                          size="lg"
                                          type="submit"
                                          form="crateMapForm"
                                          className="px-8"
                                          processingName="Creating Map"
                                          isLoading={isLoading}
                                       >
                                          <div className="flex">
                                             <Plus className="mr-2 h-4 w-4" />
                                             Create Map
                                          </div>
                                       </SubmitButton>
                                    </div>
                                 </div>
                              </form>
                           </Form>
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <>
                  <SuccessState
                     title={'Map Created Successfully!'}
                     description={`   Your world ${map?.name} is ready to be built. Let's start designing your
                           perfect 2D space.`}
                  />

                  <div className="border-t bg-muted/30 px-8 py-4 rounded-[var(--radius)]">
                     <div className="max-w-2xl mx-auto flex items-center justify-between">
                        <Button
                           variant="ghost"
                           onClick={() => {
                              setCreateSuccess(false)
                              setView('intro')
                           }}
                        >
                           <ArrowLeft className="mr-2 h-4 w-4" />
                           Go Back
                        </Button>
                        {map && (
                           <Button
                              size="lg"
                              onClick={() => handleStartBuilding(map.id)}
                              className="px-8"
                           >
                              <Zap className="mr-2 h-4 w-4" />
                              Start Building the Map
                           </Button>
                        )}
                     </div>
                  </div>
               </>
            )}
         </div>
      </div>
   )
}

export default NewMap
