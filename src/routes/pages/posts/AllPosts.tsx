import Post from "../../../components/organisms/Post";

const AllPosts = () => {
  return (
    <div className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10">ALL POSTS</h2>
      {false && (
        <div data-name="no-post-card">
          <h3 className="text-2xl font-bold">No posts found</h3>
        </div>
      )}
      <Post />
      <Post />
    </div>
  );
};

export default AllPosts;
