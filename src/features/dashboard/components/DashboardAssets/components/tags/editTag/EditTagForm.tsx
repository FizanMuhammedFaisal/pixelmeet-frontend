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
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useQueryClient } from '@tanstack/react-query'
import { useGetTag, useUpdateTag } from '../../../../../hooks'
import { Spinner } from '../../../../../../../components/ui/spinner'

// Define the Zod schema for form validation
const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, {
    message: 'Tag name must be at least 2 characters.'
  }),
  description: z.string().optional()
})

export function EditTagForm() {
  const router = useNavigate()
  const { id: tagId } = useParams<{ id: string }>()
  const queryClient = useQueryClient()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: tagId,
      name: '',
      description: ''
    }
  })

  const { data: tagData, isLoading, isError, error } = useGetTag(tagId!)

  const {
    mutate,
    isPending,
    isSuccess,
    isError: isMutationError,
    error: mutationError
  } = useUpdateTag()

  useEffect(() => {
    if (tagData) {
      const tag = tagData.data.data
      console.log(tag)
      form.reset({
        id: tag.id,
        name: tag.name,
        description: tag.description
      })
    }
  }, [tagData, form])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Tag updated successfully.')

      queryClient.invalidateQueries(['tag', tagId])
      router('/dashboard/assets')
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
    mutate({ id: tagId, name: values.name, description: values.description })
  }

  if (isLoading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50 '>
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='text-center py-8 text-red-500'>
        Error loading tag: {error.message}
      </div>
    )
  }

  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>Edit Tag</CardTitle>
        <CardDescription>
          Update the details for your asset tag.
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
              required
            />
          </div>
          {form.formState.errors.name && (
            <p className='col-start-2 col-span-3 text-red-500 text-sm'>
              {form.formState.errors.name.message}
            </p>
          )}
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Textarea
              id='description'
              {...form.register('description')}
              className='col-span-3'
              placeholder='Optional description for the tag'
            />
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router('/dashboard/tags')}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isPending}>
              {isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
