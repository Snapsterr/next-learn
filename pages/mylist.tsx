import React, { useEffect, useState } from "react"
import Grid from "../components/Grid"
import Head from "next/head"
import Header from "../components/Header"
import { useRecoilValue } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"
import Modal from "../components/Modal"
import PageTitle from "../components/PageTitle"
import useList from "../hooks/useList"
import { useAuth } from "../hooks/useAuth"
import { ExclamationCircleIcon } from "@heroicons/react/outline"
import { getProducts, Product } from "@stripe/firestore-stripe-payments"
import payments from "../lib/stripe"

interface Props {
  products: Product[]
}

const MyList = ({ products }: Props) => {
  const [isEmpty, setIsEmpty] = useState<boolean>(true)
  const showModal = useRecoilValue(modalState)
  const movie = useRecoilValue(movieState)

  const { user } = useAuth()

  const list = useList(user?.uid)

  useEffect(() => {
    if (list.length === 0) {
      setIsEmpty(true)
    } else {
      setIsEmpty(false)
    }
  }, [list])

  return (
    <>
      <Head>
        <title>
          {showModal ? movie?.title || movie?.original_name : "Favourites"} -
          next learn
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header products={products} />
      <PageTitle title="Favourites" />
      {!isEmpty ? (
        <main>
          <Grid movies={list} />
        </main>
      ) : (
        <main className="w-full h-[30vh]">
          <div className="w-[40vw] h-full mx-auto flex flex-col justify-center items-center max-md:w-full">
            <ExclamationCircleIcon className="text-[#a3a3a3] h-[18vh] w-[18vw] max-md:max-w-[20vw] max-md:max-h-[10vh] max-sm:max-h-[7vh]" />
            <div className="w-full text-center text-[1.3rem] text-[#686868] max-md:text-[1rem]">
              You haven't added anything to your favorites list yet
            </div>
          </div>
        </main>
      )}
      {showModal && <Modal />}
    </>
  )
}

export default MyList

export const getServerSideProps = async () => {
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error.message))

  return {
    props: {
      products,
    },
  }
}
