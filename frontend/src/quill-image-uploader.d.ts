export interface imageUploader {
  upload: (file: File) => Promise<any>;
}
