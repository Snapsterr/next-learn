import { useState, useEffect } from "react"
import { Movie } from "../typings"

interface IFetchingByNavigation {
  page: number
  movies: Movie[]
  fetchLink: string
}

const useFetchingByNavitation = ({
  page,
  movies,
  fetchLink,
}: IFetchingByNavigation): [Movie[], boolean] => {
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [pageMovies, setPageMovies] = useState<Movie[]>(movies)
  const [loading, setLoading] = useState<boolean>(false)

  const fetchByPageNumber = async () => {
    setLoading(true)
    const data = await fetch(`${fetchLink}&page=${page}`)
      .then((res) => res.json())
      .catch((error) => console.log(error))
      .finally(() => setLoading(false))
    setPageMovies(data.results)
  }

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
      return
    }
    fetchByPageNumber()
  }, [page])

  return [pageMovies, loading]
}

export default useFetchingByNavitation
