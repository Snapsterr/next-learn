import React from "react"
import requests from "../utils/request"
import { Movie } from "../typings"
import Grid from "../components/Grid"
import Head from "next/head"
import Header from "../components/Header"
import { useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import Modal from "../components/Modal"

interface Props {
  tvShows: Movie[]
}

const tvshows = ({ tvShows }: Props) => {
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
      <div className="flex flex-col space-y-2 py-16 md:space-y-4 lg:h-[65vh] lg:justify-end lg:pb-12">
        <div>TV Shows</div>
      </div>
      <main>
        <Grid movies={tvShows} />
      </main>
      {showModal && <Modal />}
    </>
  )
}

export default tvshows

export const getServerSideProps = async () => {
  const tvShows = await fetch(requests.fetchTVShows).then((res) => res.json())

  return {
    props: {
      tvShows: tvShows.results,
    },
  }
}
