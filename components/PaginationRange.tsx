import { Pagination } from "@mui/material"
import React from "react"

interface Props {
  currentPage: number
  totalPages: number
  handleNextPage: (page: number) => void
  handlePrevPage: (page: number) => void
}
const PaginationRange = ({
  currentPage,
  totalPages,
  handlePrevPage,
  handleNextPage,
}: Props) => {
  return (
    <div className="flex justify-center items-center h-[110px] max-sm:h-[85px]">
      <Pagination
        count={totalPages}
        defaultPage={1}
        color="primary"
        size="large"
        className=" max-sm:w-[100vw]  max-sm:text-[9px]"
        sx={{
          backgroundColor: "transparent !important", // gets overridden if not important
          color: "#fff !important",
          ".MuiButtonBase-root": {
            color: "#fff",
          },
          ".MuiTouchRipple-root": {
            color: "#fff",
          },
          ".MuiPaginationItem-root": {
            color: "#fff",

            "&:not(.MuiPaginationItem-ellipsis):hover": {
              backgroundColor: "#222222",
            },
          },
          ".MuiPaginationItem-root.Mui-selected": {
            backgroundColor: "#383838",
          },
          ".MuiPagination-ul": {
            justifyContent: "center",
          },
          "@media (max-width: 480px)": {
            ".MuiPaginationItem-root": {
              minWidth: "24px",
              height: "24px",
            },
          },
        }}
      />
    </div>
  )
}

export default PaginationRange
