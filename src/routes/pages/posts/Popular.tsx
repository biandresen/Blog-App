import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { type PostType } from "../../../types/post.types";
import PostCard from "../../../components/molecules/PostCard";
import { getPopularPosts } from "../../../lib/axios";
import Post from "../../../components/organisms/Post";

const Popular = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  useEffect(() => {
    const fetchPopularPosts = async () => {
      // Fetch popular posts from the API
      try {
        const res = await getPopularPosts();
        console.log(res.data);
        setPosts(res.data);
      } catch (err: any) {
        console.error("Error fetching popular posts:", err);
        toast.error(err.message || "Failed to load popular posts");
      }
    };

    fetchPopularPosts();
  }, []);

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">POPULAR POSTS</h2>
      <section className="posts-section">
        {!posts && (
          <div>
            <h3 className="posts-section-heading text-[var(--text1)]">No posts found</h3>
          </div>
        )}
        {/* {posts && posts.map((post) => <PostCard id={post.id} title={post.title} likes={post.likes.length} />)} */}
        {posts && posts.map((post) => <Post key={post.id} post={post} />)}
      </section>
    </div>
  );
};

export default Popular;
