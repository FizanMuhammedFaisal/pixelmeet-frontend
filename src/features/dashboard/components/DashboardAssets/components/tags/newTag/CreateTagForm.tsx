import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'

import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCreateTag } from '../../../../../hooks/useCreateTag'
import { GlobalMutationError } from '../../../../../../../shared/lib/utils'
import SubmitButton from '../../../../../../../components/ui/submit-button'

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Tag name must be at least 2 characters.'
  }),
  description: z.string().nonempty({
    message: 'Description required'
  })
})

export function CreateTagForm() {
  const router = useNavigate()

  const { mutate, isPending, isSuccess, isError, error } = useCreateTag()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    if (isSuccess) {
      toast.success('Tag created successfully.')
      router('/dashboard/assets?tab=tags')
    }
    if (isError) {
      toast.error(error.message || 'Failed to create tag.')
    }
  }, [isSuccess, isError, error, router])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    mutate(
      { name: values.name, description: values.description },
      {
        onError: error => {
          GlobalMutationError(error)

          const firstDetail = error.response?.data?.issues?.[0]?.message
          const fallback =
            error.response?.data?.message || 'Something went wrong Try Again'

          toast.error(firstDetail || fallback)
        }
      }
    )
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Create New Tag</CardTitle>
        <CardDescription>
          Fill in the details for your new asset tag.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-4 py-4'
        >
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              {...form.register('name')}
              className='col-span-3'
            />
            {form.formState.errors.name && (
              <p className='col-start-2 col-span-3 text-red-500 text-sm'>
                {form.formState.errors.name.message}
              </p>
            )}
          </div>

          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Textarea
              id='description'
              {...form.register('description')}
              className='col-span-3'
              placeholder='description for the tag'
            />
            {form.formState.errors.description && (
              <p className='col-start-2 col-span-3 text-red-500 text-sm'>
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router('/dashboard/assets')}
            >
              Cancel
            </Button>
            <SubmitButton
              processingName='Creating'
              isLoading={isPending}
              isSuccess={isSuccess}
            >
              Create
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
