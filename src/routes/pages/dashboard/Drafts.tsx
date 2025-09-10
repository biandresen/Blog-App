import DraftCard from "../../../components/molecules/DraftCard";
import draftsContent from "../../../text-content/drafts-page";

const Drafts = () => {
  const drafts = [
    { id: 1, title: "Draft 1" },
    { id: 2, title: "Draft 2" },
    { id: 3, title: "Draft 3" },
    { id: 4, title: "Draft 1" },
    { id: 5, title: "Draft 2" },
    { id: 6, title: "Draft 3" },
  ];

  return (
    <div data-name="post-grid-container" className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10">
        {draftsContent.heading1}
      </h2>
      <section className="flex flex-wrap gap-4 mt-10 justify-center mx-auto w-full xl:w-[90%]">
        {false && (
          <div data-name="no-post-card">
            <h3 className="text-2xl font-bold">{draftsContent.heading2}</h3>
            <p className="text-lg text-gray-500">{draftsContent.paragraph}</p>
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
