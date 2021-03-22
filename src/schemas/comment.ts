import FileSchema from './file';

export default interface CommentSchema {
  id: string;
  text: string;
  edited: boolean;
  level: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    fullname: string;
    username: string;
    avatar?: FileSchema;
  };
  file?: FileSchema;
  reply?: CommentSchema;
  replies: CommentSchema[];
  meta: {
    id: string;
    vote: number;
  }[];
}
