import React from "react"
import requests from "../utils/request"
import { Movie } from "../typings"
import Grid from "../components/Grid"
import Head from "next/head"
import Header from "../components/Header"
import { useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import Modal from "../components/Modal"
import PageTitle from "../components/PageTitle"

interface Props {
  popularMovies: Movie[]
}

const Movies = ({ popularMovies }: Props) => {
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)
  return (
    <>
      <Head>
        <title>
          {showModal ? movie?.title || movie?.original_name : "Home"} - next
          learn
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <PageTitle title="Top Rated Movies" />
      <main>
        <Grid movies={popularMovies} />
      </main>
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
      popularMovies: popularMovies.results,
    },
  }
}
