import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { UploadFile, AssetType } from '../../types';

import { Textarea } from '../../../../../../components/ui/textarea';
import { uploadFileSchema } from '../../schema/asset/form.schema';
import { CardContent, CardFooter } from '../../../../../../components/ui/card';
import { getStatusBadgeVariant, getStatusIcon } from './Statusbadge';
import { Badge, Upload } from 'lucide-react';

import { useCallback, useState } from 'react';
import { Button } from '../../../../../../components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../../../components/ui/select';
import {
  useUploadTabStore,
  type UpdateFileInput,
} from '../../../../../../app/store/admin/uploadTab.store';

import { type Tag } from '../../../../../../app/store/admin/tagsTab.store';

import { TagMultiSelect } from '../../../../../../shared/layout/common/TagMultiSelect';

type FormValues = z.infer<typeof uploadFileSchema>;

type MetadataFormProps<T extends UploadFile> = {
  updateFile: (id: string, updates: UpdateFileInput) => void;
  file: T;
  onUpload: () => void;
};

export const MetadataForm = <T extends UploadFile>({ file, onUpload }: MetadataFormProps<T>) => {
  const { id, type, uploadStatus, error } = file;
  const [typeAlert, setTypeAlert] = useState(false);

  const { updateFile } = useUploadTabStore();
  const {
    control,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm<FormValues>({
    resolver: zodResolver(uploadFileSchema),
    defaultValues: {
      ...file,
      metadata: file.metadata,
      ...(file.type === 'spritesheet' && {
        metadata: {
          frameConfig: {},
        },
      }),
    } as FormValues,
    mode: 'onChange',
  });

  const getErrorMessage = (fieldPath: string) => {
    const pathParts = fieldPath.split('.');
    let currentError: any = errors;
    for (const part of pathParts) {
      if (currentError && currentError[part]) {
        currentError = currentError[part];
      } else {
        return undefined;
      }
    }
    return currentError?.message;
  };

  const handleFormSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    switch (data.type) {
      case 'audio':
        updateFile(id, {
          type: 'audio',
          description: data.description,
          tags: data.tags,
          name: data.name,
        });
        break;
      case 'spritesheet':
        updateFile(id, {
          type: 'spritesheet',
          metadata: data.metadata,
          description: data.description,
          tags: data.tags,
          name: data.name,
        });

        break;
      case 'image':
        updateFile(id, {
          type: 'image',
          description: data.description,
          tags: data.tags,
          name: data.name,
        });
        break;

      case 'tilemapTiledJSON':
        updateFile(id, {
          type: 'tilemapTiledJSON',
          description: data.description,
          tags: data.tags,
          name: data.name,
        });
        break;

      default:
        break;
    }
    onUpload();
  };
  //

  const handleTypeChange = useCallback(
    (newType: AssetType) => {
      if (newType === 'unknown') {
        return setTypeAlert(true);
      } else {
        setTypeAlert(false);
      }
      setValue('type', newType, { shouldValidate: true });

      if (newType === 'spritesheet') {
        setValue('metadata', {
          frameConfig: { frameWidth: 0, frameHeight: 0 },
        });
      } else {
        setValue('metadata', {});
      }

      updateFile(id, { type: newType });
    },
    [updateFile, id],
  );

  return (
    <div className="w-full max-w-4xl mx-auto " key={id}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 w-full md:w-1/3">
            <div className="grid gap-2">
              {typeAlert && (
                <div className="text-red-500 text-sm mb-2">Please select the appropriate type</div>
              )}
              <Label htmlFor={`file-type-${id}`} className="mb-2">
                Asset Type
              </Label>

              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select value={field.value || ''} onValueChange={handleTypeChange}>
                    <SelectTrigger id={`file-type-${id}`}>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="tilemapTiledJSON">Tileset JSON</SelectItem>
                      <SelectItem value="spritesheet">Sprite Sheet</SelectItem>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
          </div>

          <form
            className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-4"
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <div className="grid gap-2">
              <Label htmlFor={`asset-name-${id}`}>Asset Name</Label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    id={`asset-name-${id}`}
                    placeholder="e.g., Forest Tileset"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor={`tags-${id}`}>Tags</Label>
              <Controller
                name="tags"
                control={control}
                render={({ field }) => {
                  const selectedTagIds = field.value || [];

                  return (
                    <TagMultiSelect
                      selected={selectedTagIds}
                      onChange={(selectedTags: Tag[]) => {
                        updateFile(id, { tags: selectedTags });

                        field.onChange(selectedTags);
                      }}
                      placeholder="Select tags..."
                    />
                  );
                }}
              />
              {errors.tags && <p className="text-red-500 text-sm">{errors.tags.message}</p>}
            </div>
            <div className="grid gap-2 col-span-2">
              <Label htmlFor={`description-${id}`}>Description</Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id={`description-${id}`}
                    placeholder="Optional description"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description.message}</p>
              )}
            </div>

            {type === 'spritesheet' && (
              <>
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
                        value={field.value}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                  {getErrorMessage('metadata.frameConfig.frameWidth') && (
                    <p className="text-red-500 text-sm">
                      {getErrorMessage('metadata.frameConfig.frameWidth')}
                    </p>
                  )}
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
                        value={field.value}
                        onChange={(e) => {
                          const value = Number.parseInt(e.target.value);
                          field.onChange(value);
                        }}
                      />
                    )}
                  />
                  {getErrorMessage('metadata.frameConfig.frameHeight') && (
                    <p className="text-red-500 text-sm">
                      {getErrorMessage('metadata.frameConfig.frameHeight')}
                    </p>
                  )}
                </div>
              </>
            )}

            <CardFooter className="flex flex-col md:flex-row items-center justify-between p-0 pt-4 gap-3 col-span-full">
              <div className="flex items-center gap-2 w-full md:w-auto">
                {getStatusIcon(uploadStatus)}
                {uploadStatus === 'failed' && error && (
                  <span className="text-sm text-red-500 truncate max-w-[200px]">
                    {error.message}
                  </span>
                )}
              </div>
              <div className="flex gap-2 w-full md:w-auto justify-end">
                {uploadStatus === 'failed' && (
                  <Button variant="outline" onClick={onUpload}>
                    Retry
                  </Button>
                )}
                {(uploadStatus === 'pending' || uploadStatus === 'failed') && (
                  <Button type="submit">
                    <Upload className="w-4 h-4 mr-2" /> Upload
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </div>
      </CardContent>
    </div>
  );
};
