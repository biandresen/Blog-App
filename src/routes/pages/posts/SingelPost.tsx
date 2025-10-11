import { useEffect, useState, type CSSProperties } from "react";
import { useParams } from "react-router-dom";
import Post from "../../../components/organisms/Post";
import type { PostType } from "../../../types/post.types";
import { ClipLoader } from "react-spinners";
import { getPost } from "../../../lib/axios";
import { toast } from "react-toastify";

const SingelPost = () => {
  const [post, setPost] = useState<PostType | null>(null);

  const { id: postId } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await getPost(Number(postId));
        if (res.statusCode !== 200) {
          toast.error("Failed to fetch post");
          throw new Error("Failed to fetch post");
        }
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };

    fetchPost();

    return () => {};
  }, []);

  const override: CSSProperties = {
    color: "var(--text1)",
  };

  if (!post) {
    return (
      <div className="spinner-position">
        <ClipLoader
          color={override.color}
          cssOverride={override}
          size={150}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );
  }

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">ALL POSTS</h2>
      <section>
        <Post
          key={post.id}
          post={post}
          onPostUpdated={(id) => console.log(id)}
          onPostDeleted={(id) => console.log(id)}
        />
      </section>
    </div>
  );
};

export default SingelPost;
