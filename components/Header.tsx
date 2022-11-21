import { BellIcon, SearchIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useAuth } from "../hooks/useAuth"
import { BasicMenu } from "./BasicMenu"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const { logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && "bg-[#141414]"}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <img
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          <Link className="headerLink" href="/">
            Home
          </Link>
          <Link className="headerLink" href="/tvshows">
            TV Shows
          </Link>
          <Link className="headerLink" href="/movies">
            Movies
          </Link>
          <Link className="headerLink" href="/new&popular">
            New & Popular
          </Link>
          <Link className="headerLink" href="/mylist">
            My list
          </Link>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <div className="w-fit h-fit relative">
          <button className="btnSearch w-8 h-8 px-1 border-none outline-none cursor-pointer absolute right-0 bg-transparent hover:text-[#b3b3b3]">
            <SearchIcon className="hidden h-6 w-6 sm:inline" />
          </button>
          <input
            type="text"
            className="inputSearch h-8 w-8 border-b-[1px] p-[16px] border-b-transparent text-base bg-transparent tracking-wider outline-0 transition-all duration-500 ease-in-out text-[#fff] text-[14px] placeholder:text-[#fff]/50 placeholder:text-[14px] placeholder:tracking-wider placeholder:font-light focus:w-[200px] focus:pl-[6px] focus:rounded-none focus:bg-transparent focus:border-b-[1px] focus:border-b-[#fff]/50 max-lg:focus:w-[140px]"
            placeholder="Type to Search..."
          />
        </div>
        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
