import { type User } from "./context.types";

// type UserType = {
//   avatar: string | null;
//   id: number;
//   username: string;
// };

export type CommentType = {
  authorId: number;
  body: string;
  changedAt: string;
  createdAt: string;
  id: number;
  postId: number;
  user: User;
};

export type TagType = {
  id: number;
  name: string;
  changedAt: string;
  createdAt: string;
};

export interface PostType {
  authorId: number;
  title: string;
  body: string;
  changedAt: string;
  createdAt: string;
  id: number;
  published: boolean;
  likes: PostLike[];
  comments: CommentType[];
  tags: TagType[];
  user: User;
}

export interface PostLike {
  postId: number;
  userId: number;
  user: {
    id: number;
    username: string;
  };
}
