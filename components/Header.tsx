import { BellIcon, SearchIcon } from "@heroicons/react/solid"
import Link from "next/link"
import { useEffect, useState, useRef } from "react"
import { useAuth } from "../hooks/useAuth"
import useOnClickOutside from "../hooks/useOnClickOutside"
import useDebounce from "../hooks/useDebounce"
import { BasicMenu } from "./BasicMenu"
import SearchResult from "./SearchResult"
import Modal from "./Modal"
import { useRecoilValue } from "recoil"
import { modalState } from "../atoms/modalAtom"
import SearchField from "./SearchField"

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)

  const showModal = useRecoilValue(modalState)

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
            My List
          </Link>
        </ul>
      </div>

      <div className="flex items-center space-x-4 text-sm font-light">
        <SearchField />
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
