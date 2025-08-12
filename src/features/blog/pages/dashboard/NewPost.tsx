import { useState } from "react";
import Button from "../../../../components/atoms/Button";
import Input from "../../../../components/atoms/Input";

const NewPost = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [tags, setTags] = useState<string>("");

  const resetForm = () => {
    setTitle("");
    setContent("");
    setTags("");
  };

  const handleSaveDraft = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle post draft
    console.log("Post saved as draft:", { title, content });
    resetForm();
  };

  const handlePublishPost = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to handle post submission
    console.log("Post published:", { title, content });
    resetForm();
  };

  const newPostTitle = "NEW POST";
  const buttonText1 = "SAVE AS DRAFT";
  const buttonText2 = "PUBLISH POST";

  return (
    <div className="bg-[var(--primary)] p-3 md:p-8 rounded-2xl w-1/2 mx-auto md:mt-10">
      <h2 className="text-5xl text-center my-5">{newPostTitle}</h2>
      <form className="">
        <Input
          className="text-[var(--text2)] rounded-xl text-2xl! mb-2"
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
        <label htmlFor="content" className="text-[var(--text2)] text-2xl font-bold md:my-2">
          Content
        </label>
        <textarea
          className="text-2xl rounded-2xl bg-[var(--bg)] w-full text-[var(--text1)] indent-3 font-normal md:h-50 py-2 mb-4"
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
          className="text-[var(--text2)] rounded-xl text-2xl! mb-2"
          id="tags"
          label="Tags"
          type="text"
          value={tags}
          onChange={(e) => {
            setTags(e.target.value);
          }}
          placeholder="Add tags (comma separated)"
        />
        <div className="flex justify-space-between md:gap-10 md:my-4">
          <Button
            onClick={handleSaveDraft}
            type="submit"
            variant="shade"
            className="w-full mt-4"
            label={buttonText1}
          >
            {buttonText1}
          </Button>
          <Button
            onClick={handlePublishPost}
            type="submit"
            variant="secondary"
            className="w-full mt-4"
            label={buttonText2}
          >
            {buttonText2}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default NewPost;
