import React from "react"
import Image from "next/legacy/image"
import { Movie } from "../typings"
import { useRecoilState } from "recoil"
import { modalState, movieState } from "../atoms/modalAtom"

interface Props {
  isSearching: boolean
  searchedData: Movie[]
}

const SearchResult = ({ isSearching, searchedData }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  console.log("resu", searchedData)
  return (
    <div
      className={` absolute top-[33px] w-full ${
        isSearching && searchedData.length ? "block " : "hidden"
      }`}
    >
      <div className="searchResultWrapper h-[300px] overflow-y-scroll">
        <div className="flex flex-col items-stretch justify-start">
          {searchedData.map((movie) => (
            <div
              className="searchResultBlock relative w-full h-[30px] flex flex-row justify-start items-center cursor-pointer bg-[rgba(44,44,44,0.5)] hover:bg-[rgba(44,44,44,0.7)]"
              key={movie.id}
              onClick={() => {
                setCurrentMovie(movie)
                setShowModal(true)
              }}
            >
              <div className="w-[40px] h-full relative flex flex-col justify-center items-center">
                {movie.backdrop_path || movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${
                      movie.backdrop_path || movie.poster_path
                    }`}
                    className="w-full rounded-sm object-fit md:rounded"
                    layout="fill"
                  />
                ) : (
                  <div className="w-full text-[8px] bg-black py-[4px] text-center">
                    No Image
                  </div>
                )}
              </div>
              <span className="overflowDots text-[12px] pl-[7px] leading-[12px] flex-1">
                {movie.original_title || movie.title}
              </span>
              <span className="min-w-[26px] justify-self-end flex justify-center items-center text-[12px] ">
                {movie.vote_average}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchResult
