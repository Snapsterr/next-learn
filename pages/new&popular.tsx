import requests, { BASE_URL, links } from "../utils/request"
import { Movie } from "../typings"
import Grid from "../components/Grid"
import Head from "next/head"
import Header from "../components/Header"
import { useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import Modal from "../components/Modal"
import PageTitle from "../components/PageTitle"
import PaginationRange from "../components/PaginationRange"
import useNavigation from "../hooks/useNavigation"
import useFetchingByNavitation from "../hooks/useFetchingByNavitation"
import Loader from "../components/Loader"
import { getProducts, Product } from "@stripe/firestore-stripe-payments"
import payments from "../lib/stripe"

interface Props {
  totalPages: number
  movies: Movie[]
  products: Product[]
}

const NewAndPopular = ({ movies, totalPages, products }: Props) => {
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  const { trending } = links

  const fetchLink = `${BASE_URL}${trending}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`

  const { handleChange, page } = useNavigation()

  const [pageMovies, loading] = useFetchingByNavitation({
    page,
    movies,
    fetchLink,
  })

  return (
    <>
      <Head>
        <title>
          {showModal ? movie?.title || movie?.original_name : "New and Popular"}{" "}
          - next learn
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header products={products} />
      <PageTitle title="New & Popular" />
      <main>
        {loading ? (
          <div className="w-full h-[80vh] p-10 relative">
            <div className="m-auto w-[70vw] h-[50vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader
                color="dark:fill-gray-300"
                width="[20vw]"
                height="[20vh]"
              />
            </div>
          </div>
        ) : (
          <Grid movies={pageMovies} />
        )}
      </main>
      <PaginationRange
        currentPage={page}
        totalPages={totalPages}
        handleChange={handleChange}
      />
      {showModal && <Modal />}
    </>
  )
}

export default NewAndPopular

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))
  const newAndPopular = await fetch(requests.fetchTrending).then((res) =>
    res.json()
  )

  return {
    props: {
      movies: newAndPopular.results,
      totalPages: newAndPopular.total_pages,
      products,
    },
  }
}
