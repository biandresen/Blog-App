import { useEffect, useState } from "react";
import DraftCard from "../../../components/molecules/DraftCard";
import draftsContent from "../../../text-content/drafts-page";
import { getCurrentUserDrafts } from "../../../lib/axios";
import { useAuth } from "../../../contexts/AuthContext";
import Button from "../../../components/atoms/Button";
import { toast } from "react-toastify";
import Spinner from "../../../components/atoms/Spinner";

const Drafts = () => {
  const [drafts, setDrafts] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { accessToken } = useAuth();

  if (!accessToken) {
    return <p className="text-center mt-10 text-[var(--text1)]">Please log in to view your drafts.</p>;
  }

  const fetchDrafts = async () => {
    setLoading(true);
    if (!accessToken) {
      toast.error("You must be logged in to fetch drafts.");
      return;
    }
    try {
      const res = await getCurrentUserDrafts(accessToken, page, 3);
      if (res.statusCode === 200) {
        if (page === 1) {
          setDrafts(res.data); // replace on first page
        } else {
          setDrafts((prev) => [...prev, ...res.data]); // append on next pages
        }
        setError(null);
      }
    } catch (err: any) {
      if (err.message.includes("token")) {
        toast.error("Your session has expired. Please log in again.");
      }
      console.error("Failed to fetch drafts", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, [page]);

  if (loading) return <Spinner />;

  if (error) return <div className="text-[var(--text1)]">No posts found</div>;

  return (
    <div className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10">
        {draftsContent.heading1}
      </h2>

      <section className="flex flex-wrap gap-4 mt-10 justify-center mx-auto w-full xl:w-[90%]">
        {drafts.length === 0 && !loading && (
          <div>
            <h3 className="text-2xl font-bold text-[var(--text1)] text-center">{draftsContent.heading2}</h3>
            <p className="text-lg text-[var(--text1)]">{draftsContent.paragraph}</p>
          </div>
        )}

        {drafts.map((draft) => (
          <DraftCard key={draft.id} id={draft.id} draftTitle={draft.title} />
        ))}
      </section>
    </div>
  );
};

export default Drafts;
