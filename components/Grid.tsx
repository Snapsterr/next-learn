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
    <div className="h-40 space-y-0.5 md:space-y-2 px-10 pb-10">
      <div className="group relative md:-ml-2">
        <div
          ref={rowRef}
          className="grid grid-cols-5 gap-5 scrollbar-hide items-center space-x-0.5 overflow-x-scroll md:p-2"
        >
          {movies.map((movie) => (
            <div key={movie.id} className="ml-0">
              <Thumbnail movie={movie} />
              <h2>{movie.name || movie.original_name}</h2>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Grid
