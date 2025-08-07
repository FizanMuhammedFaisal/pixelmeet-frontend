import { queryClient } from '@/api/config/queryClient';
import { FormError } from '@/components/ui/form-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { Spinner } from '@/components/ui/spinner';

import { type UpdateAssetPayload } from '../../../schema/asset/edit.schema';
import { TagMultiSelect, type sTags } from '@/shared/layout/common/TagMultiSelect';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@radix-ui/react-separator';

import { FileCode, ImageIcon, Music } from 'lucide-react';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'sonner';
import { useGetAsset } from '../../../hooks/assets/useGetAsset';
import { useUpdateAsset } from '../../../hooks/assets/useUpdateAsset';
import { UpdateAssetSchemaForm, type UpdateAssetTypeForm } from '../../../types/asset/api';
import type { Asset } from '../../../types';

export function EditAssetDetailsForm() {
  const { id } = useParams();
  const navigate = useNavigate();

  type FormValues = UpdateAssetTypeForm;

  const { data, isLoading } = useGetAsset({ id: id as string });
  const asset = data?.data.data.assets;

  const {
    control,
    formState: { errors, isSubmitting },
    setValue,
    handleSubmit,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(UpdateAssetSchemaForm),
    defaultValues: {
      type: asset?.type,
    },
  });
  useEffect(() => {
    if (data && asset) {
      reset(asset);
    }
  }, [data, asset]);

  const { mutate } = useUpdateAsset();

  const onSubmit = (data: FormValues) => {
    console.log(data);
    const tags = data.tags?.map((curr) => curr.id);
    console.log(tags);
    mutate(
      {
        id: data.id,
        type: data.type,
        name: data.name,
        description: data.description,
        metadata: data.metadata,
        tags: tags,
      } as UpdateAssetPayload,
      {
        onSuccess: (data) => {
          reset();
          toast.success('Asset Edited');
          navigate('/dashboard/assets?tab=all');
          queryClient.invalidateQueries({
            queryKey: ['assets'],
            refetchType: 'active',
          });
        },
      },
    );
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!asset) {
    return (
      <div className="flex min-h-[300px] items-center justify-center text-muted-foreground">
        Asset not found.
      </div>
    );
  }

  const renderTypeSpecificFields = (currentAsset: Asset) => {
    switch (currentAsset.type) {
      case 'image': {
        return (
          <div className="grid gap-2">
            <Label htmlFor={`asset-preview-${id}`}>Image Preview</Label>
            <div className="relative w-full max-w-xs overflow-hidden rounded-lg border bg-muted p-2">
              {currentAsset.metadata?.url ? (
                <img
                  src={currentAsset.metadata.url || '/placeholder.svg'} // Assuming urlKey holds the direct URL
                  alt="Asset Preview"
                  className="w-full h-auto object-contain rounded-md"
                />
              ) : (
                <div className="flex h-32 items-center justify-center text-muted-foreground">
                  <ImageIcon className="h-8 w-8" />
                  <span className="ml-2 text-sm">No image URL available</span>
                </div>
              )}
            </div>
            <FormError message={errors.metadata?.message} />
          </div>
        );
      }
      case 'spritesheet': {
        return (
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor={`frame-width-${id}`}>Frame Width (px)</Label>
              <Controller
                name="metadata.frameConfig.frameWidth"
                control={control}
                render={({ field }) => (
                  <Input
                    id={`frame-width-${id}`}
                    type="number"
                    placeholder="32"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      field.onChange(Number.isNaN(value) ? undefined : value);
                    }}
                  />
                )}
              />
              <FormError message={errors.metadata?.frameConfig?.frameWidth?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`frame-height-${id}`}>Frame Height (px)</Label>
              <Controller
                name="metadata.frameConfig.frameHeight"
                control={control}
                render={({ field }) => (
                  <Input
                    id={`frame-height-${id}`}
                    type="number"
                    placeholder="32"
                    {...field}
                    value={field.value ?? ''}
                    onChange={(e) => {
                      const value = Number.parseInt(e.target.value);
                      field.onChange(Number.isNaN(value) ? undefined : value);
                    }}
                  />
                )}
              />
              <FormError message={errors.metadata?.frameConfig?.frameHeight?.message} />
            </div>
          </div>
        );
      }
      case 'tilemapTiledJSON': {
        return (
          <div className="flex flex-col items-center justify-center h-32 bg-muted rounded-lg text-muted-foreground p-4 text-center">
            <FileCode className="h-8 w-8 mb-2" />
            <p className="text-sm">
              No specific editable metadata fields for Tilemap (Tiled JSON).
            </p>
          </div>
        );
      }
      case 'audio': {
        return (
          <div className="flex flex-col items-center justify-center h-32 bg-muted rounded-lg text-muted-foreground p-4 text-center">
            <Music className="h-8 w-8 mb-2" />
            <p className="text-sm">No specific editable metadata fields for Audio assets.</p>
          </div>
        );
      }
      // case 'aseprite': {
      //   return (
      //     <div className="flex flex-col items-center justify-center h-32 bg-muted rounded-lg text-muted-foreground p-4 text-center">
      //       <Puzzle className="h-8 w-8 mb-2" />
      //       <p className="text-sm">No specific editable metadata fields for Aseprite assets.</p>
      //     </div>
      //   );
      // }
      default:
        return (
          <div className="flex flex-col items-center justify-center h-32 bg-muted rounded-lg text-muted-foreground p-4 text-center">
            <FileCode className="h-8 w-8 mb-2" />
            <p className="text-sm">No specific editable metadata fields for this asset type.</p>
          </div>
        );
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Edit Asset Details</CardTitle>
        <CardDescription>
          Update the name, description, and type-specific metadata for your asset.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit, (error) => console.log(error))}>
        <CardContent className="grid gap-6">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor={`asset-name-${id}`}>Asset Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id={`asset-name-${id}`}
                    placeholder="My Awesome Asset"
                    {...field}
                    value={field.value ?? ''}
                  />
                )}
              />
              <FormError message={errors.name?.message} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`asset-description-${id}`}>Asset Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    id={`asset-description-${id}`}
                    placeholder="A brief description of the asset"
                    {...field}
                    value={field.value ?? ''}
                  />
                )}
              />
              <FormError message={errors.description?.message} />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`tags-${id}`}>Tags</Label>
            <Controller
              name="tags"
              control={control}
              render={({ field }) => {
                const selectedTagIds = (field.value as unknown as sTags[]) || [];

                return (
                  <TagMultiSelect
                    selected={selectedTagIds}
                    onChange={(selectedTags: Tag[] | sTags[]) => {
                      console.log(selectedTagIds);
                      field.onChange(selectedTags);
                    }}
                    placeholder="Select tags..."
                  />
                );
              }}
            />
            {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
          </div>

          <Separator />

          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Type-Specific Metadata ({asset.type})</h3>
            {renderTypeSpecificFields(asset)}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting && <Spinner className="mr-2 h-4 w-4" />}
            Save Changes
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
