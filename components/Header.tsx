import Link from "next/link"
import { useEffect, useState } from "react"
import { BasicMenu } from "./BasicMenu"
import SearchField from "./SearchField"
import Notification from "./Notification"
import useSubscription from "../hooks/useSubscription"
import { useAuth } from "../hooks/useAuth"
import { Product } from "@stripe/firestore-stripe-payments"

interface Props {
  products: Product[]
}

const Header = ({ products }: Props) => {
  const [isScrolled, setIsScrolled] = useState(false)

  const { user } = useAuth()

  const subscription = useSubscription(user)

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
          height={28}
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
        <p className="hidden lg:inline">
          {
            products.filter(
              (product) => product.id === subscription?.product
            )[0]?.name
          }
        </p>
        <Notification />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="w-[32px] h-[32px] cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
