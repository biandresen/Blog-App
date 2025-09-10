import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import Button from "../../components/atoms/Button";
import Comment from "../molecules/Comment";

const Post = () => {
  const [commentsIsOpen, setCommentsIsOpen] = useState<boolean>(false);

  const toggleComments = () => {
    setCommentsIsOpen(!commentsIsOpen);
  };

  const posts = [
    {
      id: 1,
      title: "Nothing beats Beat Saber when it comes to VR games",
      content:
        "I’ve tried many games in the VR universe, but the one game I always come back to without hesitation is Beat Saber. It fits so many different moods for me. I can even sit while doing it if I’m tired. The feeling of hitting the blocks to the beat of the music is so satisfying.My favorite music to play it with is the Metallica pack. It gives so much energy and satisfaction. The learning curve is there, but the fact that you can set the difficulty makes it possible to play for most people. Maybe with the exception of people who are totally “rhythm deaf”...? Anyways! I highly recommend trying it out!",
    },
  ];
  const buttonText = `${commentsIsOpen ? "CLOSE COMMENTS" : "SHOW COMMENTS"}`;
  const tags = "javascript, react, blog, web development";
  const username = "Birando";
  const date = "05.02.2025";

  const comment =
    "This is a great post! I love Beat Saber too. This is a great post! I love Beat Saber too. This is a great post! I love Beat Saber too. This is a great post! I love Beat Saber too. This is a great post! I love Beat Saber too.This is a great post! I love Beat Saber too.This is a great post! I love Beat Saber too.This is a great post! I love Beat Saber too.I love Beat Saber too.This is a great post! I love Beat SI love Beat Saber too.This is a great post! I love Beat Saber too.I love Beat Saber too.This is a great ttats st dagt tsat ast ast ast as sagaw";

  return (
    <div className="bg-[var(--bg-input)] text-[var(--text1)] xl:w-[90%] xl:max-w-250 mx-auto rounded-2xl mb-10">
      <div className="flex flex-col-reverse md:flex-row px-5 xl:px-10 pt-6 pb-4">
        <h3 className="text-xl xl:text-4xl md:text-3xl/8">{posts[0].title}</h3>
        <div className="grid place-items-center mb-5 xl:mb-0 md:ml-auto">
          <CgProfile size={40} />
          <p className="font-bold">{username}</p>
          <p className="text-xs">{date}</p>
        </div>
      </div>
      <hr className="text-[var(--text1)] opacity-20" />
      <p className="px-5 xl:px-10 py-4 text-sm md:text-xl/7 xl:text-xl">{posts[0].content}</p>
      <hr className="text-[var(--text1)] opacity-20" />
      <div className="flex flex-col gap-3 xl:flex-row justify-between items-center px-5 xl:px-10 py-5">
        <p className="bg-[var(--primary)] text-[var(--text2)] text-xs md:text-lg xl:text-xl font-semibold rounded-2xl py-3 px-6 w-full xl:w-auto">
          {tags}
        </p>
        <Button className="w-full xl:w-auto" onClick={toggleComments} variant="tertiary" label={buttonText}>
          {buttonText}
        </Button>
      </div>
      {commentsIsOpen && (
        <div className="bg-[var(--primary)] text-[var(--text2)] p-6 rounded-b-2xl">
          <h3 className="text-2xl mb-4">Comments</h3>
          {/* <p>No comments yet. Be the first to comment!</p> */}
          <Comment username={username} date={date} comment={comment} />
        </div>
      )}
    </div>
  );
};

export default Post;
