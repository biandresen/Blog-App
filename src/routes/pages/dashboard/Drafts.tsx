import { useEffect, useState } from "react";
import DraftCard from "../../../components/molecules/DraftCard";
import draftsContent from "../../../text-content/drafts-page";
import { getCurrentUserDrafts } from "../../../lib/axios";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import Spinner from "../../../components/atoms/Spinner";
import { safeRequest } from "../../../lib/auth";
import Button from "../../../components/atoms/Button";
import Post from "../../../components/organisms/Post";

const Drafts = () => {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMiniPosts, setShowMiniPosts] = useState<boolean>(true);

  const postPresentation = showMiniPosts ? "Show full drafts" : "Show mini drafts";

  const { accessToken, setAccessToken } = useAuth();

  if (!accessToken) {
    return <p className="text-center mt-10 text-[var(--text1)]">Please log in to view your drafts.</p>;
  }

  const fetchDrafts = async () => {
    setLoading(true);

    if (!accessToken) {
      toast.error("You must be logged in to fetch drafts.");
      setLoading(false);
      return;
    }

    try {
      // Use safeRequest to auto-refresh token if expired
      const res = await safeRequest(
        getCurrentUserDrafts, // your API function
        accessToken,
        setAccessToken, // your state updater
        1, // page
        10 // limit
      );

      if (res.statusCode === 200) {
        setDrafts(res.data);
        setError(null);
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to fetch drafts.");
      console.error("Failed to fetch drafts", err);
    } finally {
      setLoading(false);
    }
  };

    const handleTogglePresentation = () => {
    setShowMiniPosts((prev) => !prev);
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  if (loading) return <Spinner />;

  if (error) return <div className="text-[var(--text1)]">No posts found</div>;

  return (
    <div className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10">
        {draftsContent.heading1}
      </h2>

      <Button
        className="block mx-auto"
        onClick={handleTogglePresentation}
        type="button"
        size="md"
        variant="primary"
        label="toggle post presentation"
      >
        {postPresentation}
      </Button>
        <section className="posts-section">
        {!drafts.length && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">No posts found</h3>
          </div>
        )}
        {showMiniPosts
          ? drafts &&
            drafts.map((draft) => (
              <DraftCard key={draft.id + draft.title} id={draft.id} draftTitle={draft.title} />)
              )
          : drafts && drafts.map((draft) => <Post
                key={draft.id + draft.title}
                post={draft}
              />
            )}
      </section>
    </div>
  );
};

export default Drafts;
