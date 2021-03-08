import { createNamespace } from '../utils';
import type { ImageFit } from '../image';
import type { Interceptor } from '../utils/interceptor';

const [name, bem] = createNamespace('uploader');

export { name, bem };

export type UploaderResultType = 'dataUrl' | 'text' | 'file';

export type FileListItem = {
  url?: string;
  file?: File;
  content?: string;
  isImage?: boolean;
  status?: '' | 'uploading' | 'done' | 'failed';
  message?: string;
  imageFit?: ImageFit;
  deletable?: boolean;
  previewSize?: number | string;
  beforeDelete?: Interceptor;
};

export function toArray<T>(item: T | T[]): T[] {
  if (Array.isArray(item)) {
    return item;
  }

  return [item];
}

export function readFileContent(file: File, resultType: UploaderResultType) {
  return new Promise<string | void>((resolve) => {
    if (resultType === 'file') {
      resolve();
      return;
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      resolve((event.target as FileReader).result as string);
    };

    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file);
    } else if (resultType === 'text') {
      reader.readAsText(file);
    }
  });
}

export function isOversize(
  items: FileListItem | FileListItem[],
  maxSize: number | string
): boolean {
  return toArray(items).some((item) => item.file && item.file.size > maxSize);
}

export function filterFiles(items: FileListItem[], maxSize: number | string) {
  const valid: FileListItem[] = [];
  const invalid: FileListItem[] = [];

  items.forEach((item) => {
    if (item.file && item.file.size > maxSize) {
      invalid.push(item);
    } else {
      valid.push(item);
    }
  });

  return { valid, invalid };
}

const IMAGE_REGEXP = /\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)/i;

export function isImageUrl(url: string): boolean {
  return IMAGE_REGEXP.test(url);
}

export function isImageFile(item: FileListItem): boolean {
  // some special urls cannot be recognized
  // user can add `isImage` flag to mark it as an image url
  if (item.isImage) {
    return true;
  }

  if (item.file && item.file.type) {
    return item.file.type.indexOf('image') === 0;
  }

  if (item.url) {
    return isImageUrl(item.url);
  }

  if (typeof item.content === 'string') {
    return item.content.indexOf('data:image') === 0;
  }

  return false;
}
