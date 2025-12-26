import { type PostType } from "../../types/post.types";

export type LoadStatus = { loading: boolean; error: string | null; loaded: boolean };

export type PostsState = {
  byId: Record<number, PostType>;
  lists: {
    published: number[];
    draftsByUser: Record<number, number[]>;
  };
  status: {
    published: LoadStatus;
    single: Record<number, LoadStatus>; // postId -> status
    drafts: Record<number, LoadStatus>; // userId -> status
  };
};

export type PostsAction =
  | { type: "UPSERT_MANY"; posts: PostType[] }
  | { type: "UPSERT_ONE"; post: PostType }
  | { type: "REMOVE_ONE"; postId: number }
  | { type: "SET_PUBLISHED_LIST"; ids: number[] }
  | { type: "SET_DRAFTS_LIST"; userId: number; ids: number[] }
  | { type: "SET_STATUS"; scope: "published" | "single" | "drafts"; key?: number; patch: Partial<LoadStatus> };
