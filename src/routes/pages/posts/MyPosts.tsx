import PostCard from "../../../components/molecules/PostCard";

const MyPosts = () => {
  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">MY POSTS</h2>
      <section className="posts-section">
        {false && (
          <div>
            <h3 className="posts-section-heading">No posts found</h3>
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

export default MyPosts;
