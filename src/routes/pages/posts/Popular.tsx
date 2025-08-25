import PostCard from "../../../components/molecules/PostCard";

const Popular = () => {
  return (
    <div className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10">POPULAR POSTS</h2>
      <section className="flex flex-wrap gap-4 mt-10 justify-center mx-auto w-full xl:w-[80%]">
        {false && (
          <div data-name="no-post-card">
            <h3 className="text-2xl font-bold">No posts found</h3>
          </div>
        )}
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
      </section>
    </div>
  );
};

export default Popular;
