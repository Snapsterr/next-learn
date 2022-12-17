import { SearchIcon } from "@heroicons/react/outline"
import React, { useRef, useState } from "react"
import useDebounce from "../hooks/useDebounce"
import useOnClickOutside from "../hooks/useOnClickOutside"
import SearchResult from "./SearchResult"

const SearchField = () => {
  const [searchInput, setSearchInput] = useState<string>("")
  const [isSearchResultOpen, setIsSearchResultOpen] = useState<boolean>(false)

  const searchRef = useRef<HTMLDivElement>(null)

  const searchedData = useDebounce(searchInput)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
  }

  const openSearchResult = (): void => {
    setIsSearchResultOpen(true)
  }

  const closeSearchResult = (): void => {
    setIsSearchResultOpen(false)
  }

  useOnClickOutside(searchRef, closeSearchResult, true)

  return (
    <div className="w-fit h-fit relative flex flex-col" ref={searchRef}>
      <div>
        <button
          className="btnSearch w-8 h-8 px-1 border-none outline-none cursor-pointer absolute right-0 bg-transparent hover:text-[#b3b3b3] max-sm:"
          onClick={openSearchResult}
        >
          <SearchIcon className="hidden h-6 w-6 sm:inline " />
        </button>
        <input
          type="text"
          value={searchInput}
          onChange={onChange}
          className={` h-8 w-8 border-b-[1px] p-[16px] border-b-transparent text-base bg-transparent tracking-wider outline-0 transition-all duration-500 ease-in-out text-[#fff] text-[14px] placeholder:text-[#fff]/50 placeholder:text-[14px] placeholder:tracking-wider placeholder:font-light focus:w-[200px] focus:pl-[6px] focus:rounded-none focus:bg-transparent focus:border-b-[1px] focus:border-b-[#fff]/50 max-lg:focus:w-[140px] focus:max-md:w-[180px] max-sm:hidden ${
            isSearchResultOpen
              ? "w-[200px] pl-[6px] rounded-none bg-transparent border-b-[1px] border-b-[#fff]/50 transition-all duration-500 ease-search-in-out max-lg:w-[140px] max-md:w-[180px] lg:w-[200px]"
              : ""
          }`}
          placeholder="Type to Search..."
        />
      </div>
      <SearchResult
        isSearching={isSearchResultOpen}
        searchedData={searchedData}
      />
    </div>
  )
}

export default SearchField
