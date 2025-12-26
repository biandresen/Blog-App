import { type PostsAction, type PostsState } from "./posts.types";

export const initialPostsState: PostsState = {
  byId: {},
  lists: { published: [], draftsByUser: {} },
  status: {
    published: { loading: false, error: null, loaded: false },
    single: {},
    drafts: {},
  },
};

function mergePost(prev: any, next: any) {
  if (!prev) return next;

  return {
    ...prev,
    ...next,

    // keep richer user object if next.user is missing
    user: next.user ?? prev.user,

    // merge comments by id and keep comment.user if next doesn’t have it
    comments: (next.comments ?? prev.comments ?? []).map((cNext: any) => {
      const cPrev = (prev.comments ?? []).find((c: any) => c.id === cNext.id);
      if (!cPrev) return cNext;

      return {
        ...cPrev,
        ...cNext,
        user: cNext.user ?? cPrev.user,
        userId: cNext.userId ?? cPrev.userId,
      };
    }),
  };
}


const defaultStatus = { loading: false, error: null, loaded: false };

export function postsReducer(state: PostsState, action: PostsAction): PostsState {
  switch (action.type) {
  case "UPSERT_MANY": {
    const byId = { ...state.byId };
    for (const p of action.posts) {
      byId[p.id] = mergePost(byId[p.id], p);
    }
    return { ...state, byId };
  }


  case "UPSERT_ONE": {
    const prev = state.byId[action.post.id];
    const merged = mergePost(prev, action.post);

    return { ...state, byId: { ...state.byId, [action.post.id]: merged } };
  }

    case "REMOVE_ONE": {
      const byId = { ...state.byId };
      delete byId[action.postId];

      const published = state.lists.published.filter((id) => id !== action.postId);

      const draftsByUser: Record<number, number[]> = {};
      for (const [userId, ids] of Object.entries(state.lists.draftsByUser)) {
        draftsByUser[Number(userId)] = ids.filter((id) => id !== action.postId);
      }

      return { ...state, byId, lists: { published, draftsByUser } };
    }

    case "SET_PUBLISHED_LIST":
      return { ...state, lists: { ...state.lists, published: action.ids } };

    case "SET_DRAFTS_LIST":
      return {
        ...state,
        lists: {
          ...state.lists,
          draftsByUser: { ...state.lists.draftsByUser, [action.userId]: action.ids },
        },
      };

    case "SET_STATUS": {
      const { scope, key, patch } = action;

      if (scope === "published") {
        return { ...state, status: { ...state.status, published: { ...state.status.published, ...patch } } };
      }

      if (scope === "single") {
        const k = key!;
        return {
          ...state,
          status: {
            ...state.status,
            single: { ...state.status.single, [k]: { ...(state.status.single[k] ?? defaultStatus), ...patch } },
          },
        };
      }

      // drafts
      const k = key!;
      return {
        ...state,
        status: {
          ...state.status,
          drafts: { ...state.status.drafts, [k]: { ...(state.status.drafts[k] ?? defaultStatus), ...patch } },
        },
      };
    }

    default:
      return state;
  }
}
