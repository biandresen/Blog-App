const About = () => {
  const aboutHeading = "ABOUT THIS WEBSITE";
  return (
    <div className="container max-w-180">
      <h2 className="text-[var(--text1)] text-3xl md:text-4xl text-center mt-3 mb-5">{aboutHeading}</h2>
      <p className="text-[var(--text1)] text-lg md:text-xl mb-4">
        This is a blog website where you can read and write blog posts, comment on them, and share your
        thoughts with the community. The platform is designed to be user-friendly and accessible, allowing
        anyone to create an account and start a topic of their choice.
      </p>
      <p className="text-[var(--text1)] text-lg md:text-xl mb-4">
        Your post can cover a wide range of topics, from technology and science to art and culture. The goal
        is to foster a space where ideas can be exchanged freely and discussions can thrive.
      </p>
      <p className="text-[var(--text1)] text-lg md:text-xl mb-4">
        Whether you're a seasoned writer or just starting out, this platform provides the tools you need to
        share your voice and connect with others. Join us in building a vibrant community of bloggers and
        readers!
      </p>
      <p className="text-[var(--text1)] text-lg md:text-xl mb-4">
        We hope you enjoy using this website and find it a valuable resource for your blogging journey. Happy
        writing!
      </p>
    </div>
  );
};

export default About;
