import { useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useAuth } from "../hooks/useAuth"

interface Props {
  modalText: string
  updateType: string
  isOpen: boolean
  inputType: string
  closeModal: (
    e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>
  ) => void
}

interface Inputs {
  currentPassword: string
  changedData: string
}

const MembershipModal = ({
  modalText,
  updateType,
  isOpen,
  inputType,
  closeModal,
}: Props) => {
  const [currentPassword, setcurrentPassword] = useState<string>("")
  const [changedData, setChangedData] = useState<string>("")
  const { error, updateUserEmail, updateUserPassword } = useAuth()

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    switch (updateType) {
      case "updateEmail":
        return updateUserEmail(currentPassword, changedData)

      case "updatePassword":
        return updateUserPassword(currentPassword, changedData)

      default:
        return null
    }
  }

  return (
    <div className={`${isOpen ? "block" : "hidden"}`}>
      <div
        className={`fixed top-0 left-0 w-[100vw] h-[100vh] z-[50] bg-[#000]/60  `}
        onClick={(e) => closeModal(e)}
      ></div>
      <div className="z-[60] absolute block z-60 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
        <form
          onSubmit={onSubmitHandler}
          className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        >
          <h2 className="text-4xl font-semibold text-center">{modalText}</h2>
          <div className="space-y-4">
            <label className="inline-block w-full">
              <input
                type="password"
                value={currentPassword}
                placeholder="current password"
                onChange={(e) => setcurrentPassword(e.target.value)}
                className="input"
              />
              {error && (
                <p className="p-1 text-[13px] font-light text-orange-500">
                  Please enter a valid password
                </p>
              )}
            </label>
            <label className="inline-block w-full">
              <input
                type={inputType}
                value={changedData}
                placeholder={`new ${inputType}`}
                onChange={(e) => setChangedData(e.target.value)}
                className="input"
              />
            </label>
          </div>

          <button
            type="submit"
            className="w-full rounded bg-[#e50914] py-3 font-semibold"
          >
            Update Information
          </button>
        </form>
      </div>
    </div>
  )
}

export default MembershipModal
