import type React from 'react'
import { useState, useEffect } from 'react'
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
import { useNavigate } from 'react-router'
import { toast } from 'sonner'
import type { AssetTags } from '../TagList'

interface EditTagFormProps {
  tagId: string
}

export function EditTagForm({ tagId }: EditTagFormProps) {
  const [tag, setTag] = useState<AssetTags | null>(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useNavigate()

  //   useEffect(() => {
  // const fetchedTag = getTagById(tagId)
  //     if (fetchedTag) {
  //       setTag(fetchedTag)
  //       setName(fetchedTag.name)
  //       setDescription(fetchedTag.description)
  //     } else {
  //       toast.error('Tag not found.')
  //       router('/tags')
  //     }
  //   }, [tagId, router])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // if (!name.trim()) {
    //   toast({
    //     title: 'Error',
    //     description: 'Tag name cannot be empty.',
    //     variant: 'destructive'
    //   })
    //   return
    // }

    // setIsSubmitting(true)
    // // Simulate API call
    // setTimeout(() => {
    //   updateTag(tagId, name, description)
    //   setIsSubmitting(false)
    //   toast({
    //     title: 'Success',
    //     description: 'Tag updated successfully.'
    //   })
    //   router.push('/tags') // Navigate back to the tags list
    // }, 500)
  }

  if (!tag) {
    return <div className='text-center py-8'>Loading tag data...</div> // Or a spinner
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
        <form onSubmit={handleSubmit} className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Name
            </Label>
            <Input
              id='name'
              value={name}
              onChange={e => setName(e.target.value)}
              className='col-span-3'
              required
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='description' className='text-right'>
              Description
            </Label>
            <Textarea
              id='description'
              value={description}
              onChange={e => setDescription(e.target.value)}
              className='col-span-3'
              placeholder='Optional description for the tag'
            />
          </div>
          <div className='flex justify-end gap-2'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.push('/tags')}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={isSubmitting}>
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
