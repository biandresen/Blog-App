import { type User } from "./context.types";

export type CommentType = {
  authorId: number;
  body: string;
  changedAt: string;
  createdAt: string;
  id: number;
  jokeId: number;
  user: User;
};

export type TagType = {
  id: number;
  name: string;
  changedAt: string;
  createdAt: string;
};

export interface JokeType {
  authorId: number;
  title: string;
  body: string;
  changedAt: string;
  createdAt: string;
  id: number;
  published: boolean;
  likes: JokeLike[];
  comments: CommentType[];
  tags: TagType[];
  user: User;
}

export interface JokeLike {
  jokeId: number;
  userId: number;
  user: {
    id: number;
    username: string;
  };
}
