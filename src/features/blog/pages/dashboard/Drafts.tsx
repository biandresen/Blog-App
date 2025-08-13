import DraftCard from "../../../../components/molecules/DraftCard";

const Drafts = () => {
  const heading = "DRAFTS";

  const drafts = [
    { id: 1, title: "Draft 1" },
    { id: 2, title: "Draft 2" },
    { id: 3, title: "Draft 3" },
    { id: 4, title: "Draft 1" },
    { id: 5, title: "Draft 2" },
    { id: 6, title: "Draft 3" },
  ];

  return (
    <div data-name="post-grid-container" className="flex flex-col items-center md:items-start p-5 md:p-10">
      <h2 className="text-5xl md:text-6xl text-[var(--text1)] mb-8">{heading}</h2>
      <div data-name="post-grid" className="grid grid-cols-[repeat(auto-fit,minmax(210px,1fr))] gap-8 w-full">
        {false && (
          <div data-name="no-post-card">
            <h3 className="text-2xl font-bold">No drafts available</h3>
            <p className="text-lg text-gray-500">Start writing a new post to create a draft.</p>
          </div>
        )}
        {drafts.map((draft) => (
          <DraftCard key={draft.id} id={draft.id} draftTitle={draft.title} />
        ))}
      </div>
    </div>
  );
};

export default Drafts;
