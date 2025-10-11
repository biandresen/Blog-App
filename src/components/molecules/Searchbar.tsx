import { RxCross2 } from "react-icons/rx";
import { ImSearch } from "react-icons/im";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";

const Searchbar = ({ handleSearch }: { handleSearch: (input: string) => void }) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const debouncedSearch = useDebounce(searchInput, 300);

  // Automatically call search when user stops typing
  useEffect(() => {
    handleSearch(debouncedSearch);
  }, [debouncedSearch, handleSearch]);

  const resetSearch = () => {
    setSearchInput("");
  };
  return (
    <div className="flex items-center bg-[var(--primary)] p-4 rounded-full max-w-[90%] xl:w-1/2 mx-auto">
      <section className="flex items-center bg-[var(--primary-shade)] p-4 rounded-full w-full justify-between">
        <div className="flex">
          <button
            onClick={() => handleSearch(searchInput)}
            type="button"
            className="text-[var(--text2)]"
            aria-label="Search posts"
          >
            <ImSearch size={30} />
          </button>
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            placeholder="Search posts..."
            className="bg-transparent outline-none text-[var(--text2)] w-full ml-4 text-xl lg:text-2xl"
          />
        </div>
        <button
          onClick={resetSearch}
          type="button"
          className="text-[var(--text2)]"
          aria-label="Close search bar"
        >
          <RxCross2 size={30} />
        </button>
      </section>
    </div>
  );
};

export default Searchbar;
