import { useState } from "react"
import MembershipModal from "./MembershipModal"

interface Props {
  membershipText: string
  updateType: string
  inputType: string
}

const MembershipLink = ({ membershipText, updateType, inputType }: Props) => {
  const [isOpen, setIsOpen] = useState(false)

  const closeModal = (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => {
    e.stopPropagation()
    e.preventDefault()
    setIsOpen(false)
  }

  return (
    <>
      <p className="membershipLink" onClick={() => setIsOpen(true)}>
        {membershipText}
      </p>
      <MembershipModal
        modalText={membershipText}
        updateType={updateType}
        isOpen={isOpen}
        inputType={inputType}
        closeModal={closeModal}
        setOpen={setIsOpen}
      />
    </>
  )
}

export default MembershipLink
