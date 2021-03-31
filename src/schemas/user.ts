import FileSchema from './file';

export default interface UserSchema {
  age?: Date;
  avatar?: FileSchema;
  email: string;
  fullname: string;
  id: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
