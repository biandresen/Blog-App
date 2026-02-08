import { RxCross2 } from "react-icons/rx";
import { ImSearch } from "react-icons/im";
import { useEffect, useState } from "react";
import useDebounce from "../../hooks/useDebounce";
import { MAX_CHARS } from "../../lib/constants";

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
    <div className="flex items-center bg-[var(--primary)] p-4 rounded-full max-w-[100%] xl:w-1/2 mx-auto">
      <section className="flex items-center bg-[var(--primary-shade)] p-4 rounded-full w-full justify-between">
        <div className="flex">
          <button
            onClick={() => handleSearch(searchInput)}
            type="button"
            className="text-[var(--text2)]"
            aria-label="Search jokes"
          >
            <ImSearch size={25} />
          </button>
          <input
            value={searchInput}
            onChange={(e) => {if (e.target.value.length <= MAX_CHARS.SEARCH) setSearchInput(e.target.value)}}
            type="text"
            placeholder="Search jokes..."
            className="bg-transparent outline-none text-[var(--text2)] w-full ml-4 text-sm sm:text-lg lg:text-2xl"
          />
        </div>
        <button
          onClick={resetSearch}
          type="button"
          className="text-[var(--text2)]"
          aria-label="Close search bar"
        >
          <RxCross2 size={25} />
        </button>
      </section>
    </div>
  );
};

export default Searchbar;
