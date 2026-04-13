import { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { ImSearch } from "react-icons/im";

import { MAX_CHARS } from "../../lib/constants";
import { useLanguage } from "../../contexts/LanguageContext";

type SearchbarProps = {
  handleSearch: (input: string) => void;
  blurSignal?: number;
};

const Searchbar = ({ handleSearch, blurSignal = 0 }: SearchbarProps) => {
  const [searchInput, setSearchInput] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { t } = useLanguage();

  const handleChange = (value: string) => {
    if (value.length > MAX_CHARS.SEARCH) return;

    setSearchInput(value);
    handleSearch(value);
  };

  const resetSearch = () => {
    setSearchInput("");
    handleSearch("");
    inputRef.current?.focus();
  };

  useEffect(() => {
    if (window.innerWidth < 768) {
      inputRef.current?.blur();
    }
  }, [blurSignal]);

  return (
    <div className="flex items-center bg-[var(--primary)] p-4 rounded-full max-w-[100%] xl:w-1/2 mx-auto">
      <section className="flex items-center bg-[var(--primary-shade)] p-4 rounded-full w-full justify-between">
        <div className="flex items-center w-full min-w-0">
          <button
            type="button"
            onClick={() => handleSearch(searchInput)}
            className="text-[var(--text2)] shrink-0"
            aria-label={t("search.actions.search", "Search")}
          >
            <ImSearch size={25} />
          </button>

          <input
            ref={inputRef}
            value={searchInput}
            onChange={(e) => handleChange(e.target.value)}
            type="text"
            placeholder={t("search.placeholder")}
            aria-label={t("search.placeholder")}
            className="bg-transparent outline-none text-[var(--text2)] w-full ml-4 text-lg sm:text-lg lg:text-2xl min-w-0"
          />
        </div>

        <button
          type="button"
          onClick={resetSearch}
          className="text-[var(--text2)] shrink-0"
          aria-label={t("search.actions.clear", "Clear search")}
        >
          <RxCross2 size={25} />
        </button>
      </section>
    </div>
  );
};

export default Searchbar;
