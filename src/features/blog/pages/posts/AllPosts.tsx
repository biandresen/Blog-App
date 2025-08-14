import Post from "../../../../components/organisms/Post";

const AllPosts = () => {
  return (
    <div className="md:mt-8">
      <h2 className="text-[var(--text1)] text-center text-4xl md:text-5xl mb-5 md:mb-10 ">ALL POSTS</h2>
      <Post />
      <Post />
    </div>
  );
};

export default AllPosts;
