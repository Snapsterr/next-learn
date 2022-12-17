import React from "react"
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

interface Props {
  movies: Movie[]
  totalPages: number
}

const Movies = ({ movies, totalPages }: Props) => {
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)

  const { popularMovies } = links

  const fetchLink = `${BASE_URL}${popularMovies}?api_key=${process.env.NEXT_PUBLIC_API_KEY}&language=en-US`

  const { page, handleChange } = useNavigation()
  const [pageMovies, loading] = useFetchingByNavitation({
    page,
    movies,
    fetchLink,
  })

  return (
    <>
      <Head>
        <title>
          {showModal ? movie?.title || movie?.original_name : "Movies"} - next
          learn
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <PageTitle title="Top Rated Movies" />
      <main>
        {loading ? (
          <div className="w-full h-[80vh] p-10 relative">
            <div className="m-auto w-[50vw] h-[50vh] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Loader
                color="dark:fill-gray-300"
                width="[40vw]"
                height="[40vh]"
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

export default Movies

export const getServerSideProps = async () => {
  const popularMovies = await fetch(requests.fetchPopularMovies).then((res) =>
    res.json()
  )

  return {
    props: {
      movies: popularMovies.results,
      totalPages: popularMovies.total_pages,
    },
  }
}
