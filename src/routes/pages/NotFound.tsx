import { NavLink } from "react-router-dom";

import img404 from "../../assets/img/404.png";
import content404 from "../../text-content/404-page";

const NotFound = () => {
  return (
    <div className="text-center container md:my-auto! flex flex-col-reverse md:justify-center md:items-center sm:gap-5 w-[90%] lg:w-1/2">
      <section>
        <h1 className="text-[var(--text3)] text-[calc(1.8rem+1.5vw)] -mt-6 leading-9">
          {content404.heading}
        </h1>
        <p className="text-[var(--text3)] font-semibold text-[calc(0.9rem+1vw)] leading-5.5 md:leading-8 mt-2 lg:mt-6 mb-8">
          {content404.paragraph}
        </p>
        <NavLink
          to="/"
          className={
            "bg-[var(--button3)] text-[var(--text2)] hover:brightness-120 px-4 py-2 text-md md:text-xl rounded-full font-semibold transition-colors duration-200 w-full md:w-1/2 text-center"
          }
        >
          {content404.button}
        </NavLink>
      </section>
      <img
        className="mx-auto mt-[calc(1rem+2vw)] sm:mt-10 w-[calc(250px+12vw)] lg:-mt-20"
        src={img404}
        alt="computer showing 404 error"
      />
    </div>
  );
};

export default NotFound;
