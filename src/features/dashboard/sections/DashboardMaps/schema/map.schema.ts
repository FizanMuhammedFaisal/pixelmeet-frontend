import z from 'zod';

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

export const createMapFormSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  isTemplate: z.boolean(),
  isPublic: z.boolean().optional(),
  category: z.string().optional(),
  previewImageFile: z
    .instanceof(File, { message: 'Preview image is required.' })
    .refine((file) => file, 'Preview image is required.')
    .refine((file) => file?.size <= MAX_FILE_SIZE, `Max image size is 5MB.`)
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file?.type),
      'Only .jpg, .jpeg, .png and .webp formats are supported.',
    ),
});
export type CreateMapFormData = z.infer<typeof createMapFormSchema>;

export const createMapSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  isTemplate: z.boolean(),
  createdBy: z.string(),
  isPublic: z.boolean().optional(),
  category: z.string().optional(),
  previewImageUrl: z.string(),
});
