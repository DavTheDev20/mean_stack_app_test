import { ObjectId } from 'mongoose';

export interface Post {
  _id: ObjectId;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}
