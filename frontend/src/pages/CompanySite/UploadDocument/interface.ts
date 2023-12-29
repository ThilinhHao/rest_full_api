export interface ICompanyDocument {
  id: number;
  link: string;
  name: string;
  status: number;
  note: string;
}

export interface IFormDataUploadDocument {
  file: File;
}
