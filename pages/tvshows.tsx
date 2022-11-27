import React, { useState } from "react"
import requests from "../utils/request"
import { Movie } from "../typings"
import Grid from "../components/Grid"
import Head from "next/head"
import Header from "../components/Header"
import { useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import Modal from "../components/Modal"
import PageTitle from "../components/PageTitle"
import PaginationRange from "../components/PaginationRange"

interface Props {
  tvShows: Movie[]
  totalPages: number
}

const TVShows = ({ tvShows, totalPages }: Props) => {
  const [page, setPage] = useState(1)
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)

  const handlePrevPage = (prevPage: number) => {
    setPage((prevPage) => prevPage - 1)
  }

  const handleNextPage = (nextPage: number) => {
    console.log(nextPage)
    setPage((nextPage) => nextPage + 1)
  }

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
      <PageTitle title="TV Shows" />
      <main>
        <Grid movies={tvShows} />
      </main>
      <PaginationRange
        currentPage={page}
        totalPages={totalPages}
        handlePrevPage={handlePrevPage}
        handleNextPage={handleNextPage}
      />
      {showModal && <Modal />}
    </>
  )
}

export default TVShows

export const getServerSideProps = async () => {
  const tvShows = await fetch(requests.fetchTVShows).then((res) => res.json())

  return {
    props: {
      tvShows: tvShows.results,
      totalPages: tvShows.total_pages,
    },
  }
}
