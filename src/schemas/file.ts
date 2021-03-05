export default interface FileSchema {
  id: string;
  key: string;
  location: string;
  mimetype: string;
  contentType: string;
  originalname: string;
  size: number;
  createdAt: Date;
  updatedAt: Date;
}
