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
  newAndPopular: Movie[]
}

const NewAndPopular = ({ newAndPopular }: Props) => {
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
      <PageTitle title="New & Popular" />
      <main>
        <Grid movies={newAndPopular} />
      </main>
      {showModal && <Modal />}
    </>
  )
}

export default NewAndPopular

export const getServerSideProps = async () => {
  const newAndPopular = await fetch(requests.fetchTrending).then((res) =>
    res.json()
  )

  return {
    props: {
      newAndPopular: newAndPopular.results,
    },
  }
}
