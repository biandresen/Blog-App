import { useEffect, useMemo, useState } from "react";
import DraftCard from "../../../components/molecules/DraftCard";
import draftsContent from "../../../text-content/drafts-page";
import Spinner from "../../../components/atoms/Spinner";
import Button from "../../../components/atoms/Button";
import Post from "../../../components/organisms/Post";

import { usePostsStore } from "../../../stores/posts/PostsProvider";
import { selectDraftsForUser } from "../../../stores/posts/posts.selectors";
import { useUser } from "../../../contexts/UserContext";

const Drafts = () => {
  const store = usePostsStore();
  const { user } = useUser();
  const [showMiniPosts, setShowMiniPosts] = useState(true);

  const userId = user?.id ? Number(user.id) : null;

  const drafts = useMemo(() => {
    if (!userId) return [];
    return selectDraftsForUser(store, userId);
  }, [store.byId, store.lists.draftsByUser, userId]);

 useEffect(() => {
  if (!userId) return;

  const s = store.status.drafts[userId];
  if (s?.loading || s?.loaded) return;

  store.ensureDrafts(userId, 1, 10);
}, [store.ensureDrafts, store.status.drafts, userId]);


  if (!userId) return <p className="text-center mt-10 text-[var(--text1)]">Please log in to view your drafts.</p>;

  const status = store.status.drafts[userId];
  if (status?.loading) return <Spinner />;
  if (status?.error) return <div className="text-[var(--text1)]">{status.error}</div>;

  return (
    <div className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10">
        {draftsContent.heading1}
      </h2>

      <Button
        className="block mx-auto"
        onClick={() => setShowMiniPosts((p) => !p)}
        type="button"
        size="md"
        variant="primary"
        label="toggle post presentation"
      >
        {showMiniPosts ? "Show full drafts" : "Show mini drafts"}
      </Button>

      <section className="posts-section">
        {!drafts.length && <h3 className="posts-section-heading text-[var(--text1)]">No posts found</h3>}

        {showMiniPosts
          ? drafts.map((draft) => <DraftCard key={draft.id} id={draft.id} draftTitle={draft.title} />)
          : drafts.map((draft) => <Post key={draft.id} post={draft} />)}
      </section>
    </div>
  );
};

export default Drafts;
