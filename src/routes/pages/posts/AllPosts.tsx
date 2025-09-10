import Post from "../../../components/organisms/Post";

const AllPosts = () => {
  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL POSTS</h2>
      {false && (
        <section>
          <h3 className="posts-section-heading">No posts found</h3>
        </section>
      )}
      <Post />
      <Post />
    </div>
  );
};

export default AllPosts;
