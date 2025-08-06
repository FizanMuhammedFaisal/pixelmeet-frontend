import { FileCode, FolderIcon, ImageIcon } from 'lucide-react';

import type { AssetType } from '../../../../types';

type Props = {
  previewUrl: string | undefined;
  type: AssetType;
};
export const renderPreview = ({ type, previewUrl }: Props) => {
  if (!previewUrl) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
        <ImageIcon className="w-8 h-8 text-muted-foreground" />
      </div>
    );
  }
  if (type.startsWith('json/')) {
    return (
      <div className="flex items-center justify-center h-24 bg-muted rounded-lg">
        <FileCode className="h-8 w-8 text-muted-foreground" />
      </div>
    );
  }
  if (type.startsWith('image/')) {
    return (
      <img
        src={previewUrl || '/placeholder.svg'}
        alt="File preview"
        className="object-cover w-full h-full rounded-md"
      />
    );
  }
  if (type.startsWith('audio/')) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
        <audio controls src={previewUrl} className="w-full h-full" />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center w-full h-full bg-muted rounded-md">
      <FolderIcon className="w-8 h-8 text-muted-foreground" />
    </div>
  );
};
