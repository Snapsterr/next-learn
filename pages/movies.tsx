import React from "react"
import requests from "../utils/request"
import { Movie } from "../typings"

interface Props {
  popularMovies: Movie[]
}

const Movies = ({ popularMovies }: Props) => {
  console.log(popularMovies)

  return <div>tvshows</div>
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
