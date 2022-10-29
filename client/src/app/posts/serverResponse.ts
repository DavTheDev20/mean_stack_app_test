import { Post } from './post';

export interface ServerResponse {
  success: boolean;
  posts?: Post[];
  post?: Post;
}
