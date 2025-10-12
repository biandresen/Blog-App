import { useState } from "react";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import newPostContent from "../../../text-content/newPost-page";
import { publishPost, saveDraft } from "../../../lib/axios";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { usePosts } from "../../../contexts/PostsContext";

const NewPost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const formError = title === "" || content === "";

  const { accessToken } = useAuth();
  const { refreshPosts } = usePosts();

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags("");
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("You must be logged in to save a draft.");
      return;
    }
    if (formError) {
      toast.error("Title and content are required.");
      return;
    }
    try {
      const res = await saveDraft(
        accessToken,
        title,
        content,
        tags.split(",").map((tag) => tag.trim())
      );
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Request failed");
      }
      toast.success("Draft saved!");
      console.log("Draft saved successfully:", res.data);
      await refreshPosts();
      resetForm();
    } catch (err: any) {
      if (err.message.includes("token")) {
        toast.error("Your session has expired. Please log in again.");
      }
      console.error("Failed to save draft", err);
    }
  };

  const handlePublishPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("You must be logged in to publish a post.");
      return;
    }
    if (formError) {
      toast.error("Title and content are required.");
      return;
    }
    try {
      const res = await publishPost(
        accessToken,
        title,
        content,
        tags.split(",").map((tag) => tag.trim())
      );
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Request failed");
      }
      toast.success("Post published!");
      console.log("Post published successfully:", res.data);
      resetForm();
    } catch (err: any) {
      if (err.message.includes("token")) {
        toast.error("Your session has expired. Please log in again.");
      }
      console.error("Failed to publish post", err);
    }
  };

  return (
    <div className="bg-[var(--primary)] p-3 md:p-8 rounded-2xl max-w-120 md:min-w-1/2 mx-auto md:mt-10">
      <h2 className="text-3xl md:text-5xl text-center my-5">{newPostContent.heading}</h2>
      <form className="">
        <Input
          className="text-[var(--text2)] rounded-xl md:text-2xl! mb-2"
          id="postTitle"
          label="Heading"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          placeholder="Post title"
          required
        />
        <label htmlFor="content" className="text-[var(--text2)] md:text-2xl font-bold md:my-2">
          Content
        </label>
        <textarea
          className="md:text-2xl rounded-2xl bg-[var(--bg)] w-full text-[var(--text1)] px-3 font-normal md:h-50 py-2 mb-3"
          title="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Write your post content here..."
          name="content"
          id="content"
        ></textarea>
        <Input
          className="text-[var(--text2)] rounded-xl md:text-2xl! mb-2"
          id="tags"
          label="Tags"
          type="text"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
          placeholder="Add tags (comma separated)"
        />
        <div className="flex flex-col pb-3 md:flex-row justify-space-between md:gap-10 md:my-4">
          <Button
            onClick={handleSaveDraft}
            type="submit"
            variant="secondary"
            className="w-full mt-4"
            label={newPostContent.button1}
          >
            {newPostContent.button1}
          </Button>
          <Button
            onClick={handlePublishPost}
            type="submit"
            variant="tertiary"
            className="w-full mt-4"
            label={newPostContent.button2}
          >
            {newPostContent.button2}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
