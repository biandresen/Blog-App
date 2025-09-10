import PostCard from "../../../components/molecules/PostCard";
import Searchbar from "../../../components/molecules/Searchbar";

const Search = () => {
  const handleSearch = () => {
    // Logic to handle search
  };

  return (
    <div className="">
      <Searchbar handleSearch={handleSearch} />
      <section className="posts-section">
        {false && (
          <div>
            <h3 className="posts-section-heading">No posts found</h3>
          </div>
        )}
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
        <PostCard id={1} draftTitle="Sample Post Title" />
      </section>
    </div>
  );
};

export default Search;
