import PostCard from "../../../components/molecules/PostCard";
import Searchbar from "../../../components/molecules/Searchbar";

const Search = () => {
  const handleSearch = () => {
    // Logic to handle search
  };

  return (
    <div className="">
      <Searchbar handleSearch={handleSearch} />
      <section className="flex flex-wrap gap-4 mt-10 justify-center mx-auto w-full xl:w-[80%]">
        {false && (
          <div data-name="no-post-card">
            <h3 className="text-2xl font-bold">No posts found</h3>
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
