import { useState } from "react";
import { type PostType } from "../../../types/post.types";
import { useUser } from "../../../contexts/UserContext";
import { useAuth } from "../../../contexts/AuthContext";
import PostCard from "../../../components/molecules/PostCard";

const Popular = () => {
  const [posts, setPosts] = useState<PostType[]>([]);

  return (
    <div className="md:mt-8">
      <h2 className="posts-heading">POPULAR POSTS</h2>
      <section className="posts-section">
        {false && (
          <div>
            <h3 className="posts-section-heading">No posts found</h3>
          </div>
        )}
      </section>
    </div>
  );
};

export default Popular;

{
  /* <PostCard id={1} draftTitle="Sample Post Title" /> */
}
