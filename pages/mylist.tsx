import React from "react"
import { Movie } from "../typings"
import Grid from "../components/Grid"
import Head from "next/head"
import Header from "../components/Header"
import { useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import Modal from "../components/Modal"
import PageTitle from "../components/PageTitle"
import useList from "../hooks/useList"
import { useAuth } from "../hooks/useAuth"

interface Props {
  tvShows: Movie[]
}

const MyList = ({ tvShows }: Props) => {
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)

  const { user } = useAuth()

  const list = useList(user?.uid)

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
      <PageTitle title="My List" />
      {list.length > 0 ? (
        <main>
          <Grid movies={list} />
        </main>
      ) : null}
      {showModal && <Modal />}
    </>
  )
}

export default MyList
