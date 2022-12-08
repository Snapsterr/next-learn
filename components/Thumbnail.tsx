import Image from "next/legacy/image"
import { Movie } from "../typings"
import { modalState, movieState } from "../atoms/modalAtom"
import { useRecoilState } from "recoil"
import { DocumentData } from "firebase/firestore"

interface Props {
  movie: Movie | DocumentData
}

const Thumbnail = ({ movie }: Props) => {
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  return (
    <div
      className="cardContainer relative h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105"
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={`https://image.tmdb.org/t/p/w500${
          movie.backdrop_path || movie.poster_path
        }`}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
      />
      <div className="cardText w-full h-full bg-[#000]/60 transition-all duration-500 ease opacity-0 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base tracking-wider p-[16px,32px]">
          {movie?.name || movie?.original_name || movie?.original_title}
        </div>
      </div>
    </div>
  )
}

export default Thumbnail
