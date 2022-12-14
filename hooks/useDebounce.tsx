import React, { useState, useEffect } from "react"
import { Movie } from "../typings"

const useDebounce = (searchField: string): Movie[] => {
  const [debouncedValue, setDebouncedValue] = useState(searchField)
  const [searchedData, setSearchedData] = useState<Movie[]>([])

  const fetchBySearchField = async (searchQuery: string) => {
    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.NEXT_PUBLIC_API_KEY}&query=${searchQuery}&language=en-US&page=1&include_adult=false`
      const res = await fetch(url)

      if (res.status === 404) return null

      const data = await res.json()
      return setSearchedData(data.results)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(searchField), 1000)

    return () => clearTimeout(timer)
  }, [searchField])

  useEffect(() => {
    if (debouncedValue) {
      console.log("debounced")
      fetchBySearchField(searchField)
    }
  }, [debouncedValue])

  return searchedData
}

export default useDebounce
