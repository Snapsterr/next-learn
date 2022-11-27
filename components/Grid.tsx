import { DocumentData } from "firebase/firestore"
import React, { useRef } from "react"
import { Movie } from "../typings"
import Thumbnail from "./Thumbnail"

interface Props {
  movies: Movie[] | DocumentData[]
}

const Grid = ({ movies }: Props) => {
  const rowRef = useRef<HTMLDivElement>(null)

  return (
    <div className=" px-10 md:space-y-2 ">
      <div className="group relative md:-ml-2">
        <div
          ref={rowRef}
          className="grid grid-cols-[repeat(auto-fill,_minmax(280px,_1fr))] gap-7 mx-auto scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:p-2 "
        >
          {movies.map((movie) => (
            <div key={movie.id}>
              <Thumbnail movie={movie} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Grid
