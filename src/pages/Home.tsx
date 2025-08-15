import { NavLink } from "react-router-dom";
import homeImg from "../assets/img/home-img.png";
import Button from "../components/atoms/Button";

const heading = "Read and write interesting posts!";
const body = "Use the comment sections on your favorite posts to engage and create communities!";
const button1Title = "REGISTER";
const button2Title = "VIEW POSTS";

const Home = () => {
  return (
    <div
      data-label="home-page-container"
      className="container md:my-auto! md:flex md:flex-row md:justify-center md:items-center sm:gap-5"
    >
      <img className="mx-auto mt-[calc(1rem+2vw)] sm:mt-10 w-[calc(250px+12vw)]" src={homeImg} alt="books" />

      <div data-label="home-content-container">
        <h1 className="heading-theme text-[calc(1.8rem+1.5vw)] mt-[calc(1rem+2vw)] leading-9">{heading}</h1>
        <p className="theme-text3 font-semibold text-[calc(0.9rem+1vw)] leading-5.5 md:leading-8 mt-[calc(0.5rem+0.8vw)]">
          {body}
        </p>
        <div className="flex mt-[calc(1.3rem+2vw)] gap-3 w-1/1 md:flex-row md:w-full justify-between">
          <NavLink
            to="/register"
            className={
              "bg-[var(--button3)] text-[var(--text2)] hover:brightness-120 px-4 py-2 text-md md:text-xl rounded-full font-semibold transition-colors duration-200 w-[45%] text-center"
            }
          >
            {button1Title}
          </NavLink>

          <NavLink
            to="/posts"
            className={
              "bg-[var(--button2)] text-[var(--text2)] hover:brightness-120 px-4 py-2 text-md md:text-xl rounded-full font-semibold transition-colors duration-200 w-[45%] text-center"
            }
          >
            {button2Title}
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Home;
