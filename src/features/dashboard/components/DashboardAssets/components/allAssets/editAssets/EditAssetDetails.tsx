import { useEffect, useCallback } from 'react'
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
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useNavigate, useParams } from 'react-router'
import { Spinner } from '../../../../../../../components/ui/spinner'
import { useGetAsset } from '../../../../../hooks/assets/useGetAsset'
import { UpdateAssetSchema } from '../../../../../types/asset/api'

export function EditAssetDetailsForm() {
  type UpdateAssetSchema = typeof UpdateAssetSchema
  const router = useNavigate()
  const { id: assetId } = useParams<{ id: string }>()

  const {
    data: assetData,
    isLoading,
    isError,
    error
  } = useGetAsset({ assetId })
  const {
    mutate,
    isPending,
    isSuccess,
    isError: isMutationError,
    error: mutationError
  } = useUpdateAsset()

  const form = useForm<UpdateAssetSchema>({
    resolver: zodResolver(UpdateAssetSchema),
    defaultValues: {
      id: assetId,
      name: '',
      description: '',
      tags: [],
      type: 'image',
      metadata: {}
    },
    mode: 'onChange'
  })

  useEffect(() => {
    if (assetData) {
      const asset = assetData.data
      form.reset({
        id: asset.id,
        name: asset.name,
        description: asset.description || '',
        tags: asset.tags || [],
        type: asset.type,
        metadata: asset.metadata || {}
      })
    }
  }, [assetData, form])

  useEffect(() => {
    if (isSuccess) {
      toast.success('Asset updated successfully.')
      router('/dashboard/assets') // Navigate back to assets list
    }
    if (isMutationError) {
      toast.error(mutationError?.message || 'Failed to update asset.')
    }
  }, [isSuccess, isMutationError, mutationError, router])

  const onSubmit = (values: EditAssetSchema) => {
    if (!assetId) {
      toast.error('Asset ID is missing.')
      return
    }

    const updates: Partial<EditAssetSchema> = {
      name: values.name,
      description: values.description,
      tags: values.tags,
      type: values.type
    }

    if (values.type === 'spritesheet' && values.metadata?.frameConfig) {
      updates.metadata = {
        frameConfig: {
          frameWidth: values.metadata.frameConfig.frameWidth,
          frameHeight: values.metadata.frameConfig.frameHeight
        }
      }
    } else {
      // Ensure metadata is cleared or set appropriately for non-spritesheet types
      // This prevents sending old spritesheet metadata if type changes
      updates.metadata = {}
    }

    mutate({ id: assetId, updates })
  }

  const handleTypeChange = useCallback(
    (newType: AssetType) => {
      form.setValue('type', newType, { shouldValidate: true })
      if (newType === 'spritesheet') {
        form.setValue('metadata', {
          frameConfig: { frameWidth: 0, frameHeight: 0 }
        })
      } else {
        form.setValue('metadata', {})
      }
    },
    [form]
  )

  const getErrorMessage = (fieldPath: string) => {
    const pathParts = fieldPath.split('.')
    let currentError: any = form.formState.errors
    for (const part of pathParts) {
      if (currentError && currentError[part]) {
        currentError = currentError[part]
      } else {
        return undefined
      }
    }
    return currentError?.message
  }

  if (isLoading) {
    return (
      <div className='fixed inset-0 flex items-center justify-center z-50'>
        <Spinner />
      </div>
    )
  }

  if (isError) {
    return (
      <div className='text-center py-8 text-red-500'>
        Error loading asset: {error?.message || 'Unknown error'}
      </div>
    )
  }

  if (!assetData?.data) {
    return (
      <div className='text-center py-8 text-gray-500'>Asset not found.</div>
    )
  }

  const currentAssetType = form.watch('type')

  return (
    <Card className='w-full max-w-4xl mx-auto'>
      <CardHeader>
        <CardTitle>Edit Asset</CardTitle>
        <CardDescription>Update the details for your asset.</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='grid gap-4 py-4'
        >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/* Asset Name */}
            <div className='grid gap-2'>
              <Label htmlFor='name'>Asset Name</Label>
              <Input
                id='name'
                placeholder='e.g., Forest Tileset'
                {...form.register('name')}
                required
              />
              {form.formState.errors.name && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Asset Type */}
            <div className='grid gap-2'>
              <Label htmlFor='type'>Asset Type</Label>
              <Controller
                name='type'
                control={form.control}
                render={({ field }) => (
                  <Select
                    value={field.value || ''}
                    onValueChange={handleTypeChange}
                  >
                    <SelectTrigger id='type'>
                      <SelectValue placeholder='Select type' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='tilemapTiledJSON'>
                        Tileset JSON
                      </SelectItem>
                      <SelectItem value='spritesheet'>Sprite Sheet</SelectItem>
                      <SelectItem value='image'>Image</SelectItem>
                      <SelectItem value='audio'>Audio</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {form.formState.errors.type && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors.type.message}
                </p>
              )}
            </div>

            {/* Tags */}
            <div className='grid gap-2 col-span-full'>
              <Label htmlFor='tags'>Tags</Label>
              <Controller
                name='tags'
                control={form.control}
                render={({ field }) => (
                  <TagMultiSelect
                    selected={field.value || []}
                    onChange={(selectedTags: Tag[]) =>
                      field.onChange(selectedTags)
                    }
                    placeholder='Select tags...'
                  />
                )}
              />
              {form.formState.errors.tags && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors.tags.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className='grid gap-2 col-span-full'>
              <Label htmlFor='description'>Description</Label>
              <Textarea
                id='description'
                placeholder='Optional description'
                {...form.register('description')}
              />
              {form.formState.errors.description && (
                <p className='text-red-500 text-sm'>
                  {form.formState.errors.description.message}
                </p>
              )}
            </div>

            {/* Spritesheet Metadata (Conditional) */}
            {currentAssetType === 'spritesheet' && (
              <>
                <div className='grid gap-2'>
                  <Label htmlFor='frameWidth'>Frame Width (px)</Label>
                  <Input
                    id='frameWidth'
                    type='number'
                    placeholder='32'
                    {...form.register('metadata.frameConfig.frameWidth', {
                      valueAsNumber: true
                    })}
                  />
                  {getErrorMessage('metadata.frameConfig.frameWidth') && (
                    <p className='text-red-500 text-sm'>
                      {getErrorMessage('metadata.frameConfig.frameWidth')}
                    </p>
                  )}
                </div>
                <div className='grid gap-2'>
                  <Label htmlFor='frameHeight'>Frame Height (px)</Label>
                  <Input
                    id='frameHeight'
                    type='number'
                    placeholder='32'
                    {...form.register('metadata.frameConfig.frameHeight', {
                      valueAsNumber: true
                    })}
                  />
                  {getErrorMessage('metadata.frameConfig.frameHeight') && (
                    <p className='text-red-500 text-sm'>
                      {getErrorMessage('metadata.frameConfig.frameHeight')}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className='flex justify-end gap-2 pt-4'>
            <Button
              type='button'
              variant='outline'
              onClick={() => router.push('/dashboard/assets')}
            >
              Cancel
            </Button>
            <SubmitButton
              processingName='Saving...'
              isLoading={isPending}
              isSuccess={isSuccess}
            >
              Save Changes
            </SubmitButton>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
