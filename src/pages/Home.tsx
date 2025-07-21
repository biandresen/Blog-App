import homeImg from "../assets/img/home-img.png";
import Button from "../components/atoms/Button";

const heading = "Read and write interesting posts!";
const body = "Use the comment sections on your favorite posts to engage and create communities!";
const button1Title = "REGISTER";
const button2Title = "VIEW POSTS";

const Home = () => {
  return (
    <div data-label="home-page-container">
      <div data-label="home-content-container">
        <h1>{heading}</h1>
        <p>{body}</p>
        <div>
          <Button label={button1Title}>{button1Title}</Button>
          <Button label={button1Title}>{button2Title}</Button>
        </div>
      </div>
      <img src={homeImg} width={500} alt="books" />
    </div>
  );
};

export default Home;
