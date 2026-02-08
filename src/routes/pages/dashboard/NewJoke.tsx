import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/atoms/Button";
import Input from "../../../components/atoms/Input";
import newPostContent from "../../../text-content/newPost-page";
import { publishPost, saveDraft } from "../../../lib/axios";
import { safeRequest } from "../../../lib/auth";
import { useAuth } from "../../../contexts/AuthContext";
import { toast } from "react-toastify";
import { usePosts } from "../../../contexts/PostsContext";
import { getCharactersLeft, setInputErrors } from "../../../lib/utils";
import { MAX_CHARS } from "../../../lib/constants";

const NewJoke = () => {
  const [title, setTitle] = useState<string>("");
  const [body, setbody] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [postErrors, setPostErrors] = useState<string[]>([]);

  const formError = title === "" || body === "";
  const navigate = useNavigate();

  const { accessToken, setAccessToken } = useAuth();
  const { refreshPosts } = usePosts();

  const resetForm = () => {
    setTitle("");
    setbody("");
    setTags("");
  };

  const handleSaveDraft = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("You must be logged in to save a draft.");
      return;
    }
    if (formError) {
      toast.error("Title and body are required.");
      return;
    }
    try {
      const res = await safeRequest(
        saveDraft,
        accessToken,
        setAccessToken,
        title,
        body,
        tags?.split(",").map((tag) => tag.trim())
      );
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Request failed");
      }
      toast.success("Draft saved!");
      await refreshPosts();
      resetForm();
      navigate("/dashboard/drafts");
    } catch (err: any) {
      if (err.message.includes("token")) {
        toast.error("Your session has expired. Please log in again.");
      }
      console.error("Failed to save draft", err);
      setPostErrors(() => setInputErrors(err.response?.data?.errors))
    }
  };

  const handlePublishPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!accessToken) {
      toast.error("You must be logged in to publish a joke.");
      return;
    }
    if (formError) {
      toast.error("Title and body are required.");
      return;
    }
    try {
      const res = await safeRequest(
        publishPost,
        accessToken,
        setAccessToken,
        title,
        body,
        tags.split(",").map((tag) => tag.trim())
      );
      if (res.statusCode !== 200) {
        toast.error(res.message);
        throw new Error("Request failed");
      }
      toast.success("Joke published!");
      await refreshPosts();
      resetForm();
      navigate("/jokes");
    } catch (err: any) {
      if (err.message.includes("token")) {
        toast.error("Your session has expired. Please log in again.");
      }
      console.error("Failed to publish joke", err);
      setPostErrors(() => setInputErrors(err.response?.data?.errors))
    }
  };

  return (
    <div className="bg-[var(--primary)] p-3 md:p-8 rounded-2xl max-w-120 md:min-w-1/2 mx-auto md:mt-10">
      <h2 className="text-3xl md:text-5xl text-center my-5">{newPostContent.heading}</h2>
      <form className="">
        <div className="relative">
          <Input
            className="text-[var(--text2)] rounded-xl md:text-2xl! mb-2"
            id="postTitle"
            label="Title"
            type="text"
            value={title}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS.TITLE) setTitle(e.target.value);
            }}
            placeholder="Joke title here..."
            maxLength={MAX_CHARS.TITLE}
            required
          />
          <span className="absolute bottom-2 right-2 opacity-80 text-xs">{getCharactersLeft(title, MAX_CHARS.TITLE)}</span>
        </div>
        <label htmlFor="body" className="text-[var(--text2)] md:text-2xl font-bold md:my-2">
          Body
        </label>
        <div className="relative">
          <textarea
            className="md:text-2xl rounded-2xl bg-[var(--bg)] w-full text-[var(--text1)] px-3 font-normal md:h-50 py-2"
            title="body"
            value={body}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS.BODY) setbody(e.target.value);
            }}
            placeholder="Joke content here..."
            name="body"
            id="body"
            maxLength={MAX_CHARS.BODY}
          ></textarea>
          <span className="absolute bottom-2 right-5 opacity-80 text-xs">{getCharactersLeft(body, MAX_CHARS.BODY)}</span>
        </div>
        <div className="relative">
          <Input
            className="text-[var(--text2)] rounded-xl text-sm md:text-xl! mb-2 font-normal!"
            id="tags"
            label="Tags"
            type="text"
            value={tags}
            onChange={(e) => {
              if (e.target.value.length <= MAX_CHARS.TAGS) setTags(e.target.value);
            }}
            maxLength={MAX_CHARS.TAGS}
            placeholder="Add tags (comma separated)"
          />
          <span className="absolute bottom-2 right-2 opacity-80 text-xs">{getCharactersLeft(tags, MAX_CHARS.TAGS)}</span>
        </div>
        <ul className="text-[0.9rem] text-[var(--error)] my-2">
          {postErrors.map((err, index) => (
            <li key={index + err}>• {err}</li>
          ))}
        </ul>
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

export default NewJoke;
