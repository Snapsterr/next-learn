import React from "react"

interface Props {
  title: string
}

const PageTitle = ({ title }: Props) => {
  return (
    <div className="relative flex flex-col space-y-2 py-16 md:space-y-4 lg:justify-end lg:pb-12 lg:h-[65vh] md:h-[45vh] sm:h-[35vh] max-sm:h-[35vh] ">
      <div className="absolute w-full text-center select-none top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-7xl text-[#eee8ec] lg:text-7xl md:text-6xl sm:text-4xl max-sm:text-3xl ">
        <h2 className="animate-slideDown">{title}</h2>
      </div>
    </div>
  )
}

export default PageTitle
