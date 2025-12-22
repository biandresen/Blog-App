import { useState } from "react";
import { FaHashtag } from "react-icons/fa";
import type { TagType } from "../../types/post.types"
import { useColorTheme } from "../../contexts/ColorThemeContext";

  const TagsCard = ({tags}: {tags: TagType[]}) => {
    const [showTags, setShowTags] = useState<boolean>(false);
    const { colorTheme } = useColorTheme();

    return (
    <>
      {!showTags && (
        <button type="button" title="Toggle tags" aria-label="toggle tags" className="flex justify-center font-semibold px-3 py-1.5 rounded-full transition-colors duration-200 bg-transparent border-1 border-[var(--text1)]/20 text-[var(--text1)] hover:bg-[var(--button1)] hover:text-[var(--text2)] transition-colors duration-100 text-xs md:text-sm" onClick={() => setShowTags(!showTags)}><FaHashtag className="mt-0.5 mr-1" />SHOW TAGS</button>
      )}
      {showTags && (
        <p onClick={() => setShowTags(!showTags)} title={tags.map((tag: TagType) => `#${tag.name.toLowerCase()} `).join(" ")} className={`${colorTheme === "light" ? "bg-white text-[var(--text1)]" : "bg-[var(--primary)] text-[var(--text2)]"} text-xs md:text-l rounded-2xl py-2 px-6 w-full xl:w-auto cursor-pointer opacity-70`}>
        {tags.map((tag) => `#${tag.name.toLowerCase()} `)}
        </p>)}
    </>
    )
  }

  export default TagsCard