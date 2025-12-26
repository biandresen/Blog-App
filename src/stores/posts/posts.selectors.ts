import { type PostsState } from "./posts.types";
import { type PostType } from "../../types/post.types";

export function selectPost(state: PostsState, id: number): PostType | undefined {
  return state.byId[id];
}

export function selectPublishedPosts(state: PostsState): PostType[] {
  return state.lists.published.map((id) => state.byId[id]).filter(Boolean) as PostType[];
}

export function selectDraftsForUser(state: PostsState, userId: number): PostType[] {
  const ids = state.lists.draftsByUser[userId] ?? [];
  return ids.map((id) => state.byId[id]).filter(Boolean) as PostType[];
}
