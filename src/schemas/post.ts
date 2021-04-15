import CommentSchema from './comment';
import FileSchema from './file';
import UserSchema from './user';

export interface VoteSchema {
  id: string;
  voted: number;
  createdAt: Date;
  updatedAt: Date;
  user: UserSchema;
}

export default interface PostSchema {
  id: string;
  originalPoster: string;
  sensitive: boolean;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  file: FileSchema;
  tags: any[];
  comments: CommentSchema[];
  votes: VoteSchema[];
  reason?: string;
}
