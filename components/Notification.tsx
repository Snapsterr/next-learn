import { useState, useRef, useEffect } from "react"
import { BellIcon } from "@heroicons/react/outline"
import useOnClickOutside from "../hooks/useOnClickOutside"
import {
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDocs,
} from "firebase/firestore"
import { db } from "../lib/firebase"
import { useAuth } from "../hooks/useAuth"
import { notificationsCountState } from "../atoms/modalAtom"
import { useRecoilState } from "recoil"
import NotificationInfo from "./NotificationInfo"

const Notification = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [notificationsData, setNotificationsData] = useState<DocumentData>([])
  const [notificationsIdList, setNotificationsIdList] = useState<string[]>([])
  const notificationRef = useRef<HTMLDivElement>(null)

  const [notificationsCount, setNotificationsCount] = useRecoilState(
    notificationsCountState
  )

  const { user } = useAuth()

  const getNotifications = async () => {
    try {
      const colRef = collection(db, "customers", user!.uid, "notifications")
      const docsSnap = await getDocs(colRef)

      const id = docsSnap.docs.map((el) => {
        return el.id
      })

      const notificationsArr = docsSnap.docs.map((el) => {
        return el.data()
      })
      setNotificationsData(notificationsArr)
      setNotificationsIdList(id)
    } catch (e) {
      console.log(e)
    }
  }

  const clearNotifications = async () => {
    try {
      setNotificationsIdList([])
      setNotificationsCount(0)
      await notificationsIdList.map((notificationId) => {
        deleteDoc(
          doc(db, "customers", user!.uid, "notifications", notificationId)
        )
      })
    } catch (e) {
      console.log(e)
    }
  }

  const onClickHandler = (): void => {
    setIsOpen(!isOpen)
  }

  const closeNotificationBlock = (): void => {
    console.log("closed")
    clearNotifications()
    setNotificationsData([])
    setIsOpen(false)
  }

  useOnClickOutside(notificationRef, closeNotificationBlock, isOpen)

  useEffect(() => {
    getNotifications()
  }, [notificationsCount, isOpen])

  console.log("2213", notificationsCount, notificationsIdList)

  return (
    <div
      className="relative flex justify-center items-center"
      ref={notificationRef}
    >
      <button
        className="relative cursor-pointer bg-transparent hover:text-[#b3b3b3]"
        onClick={onClickHandler}
      >
        <BellIcon className="h-6 w-6" />
        {notificationsIdList.length > 0 ? (
          <div className="absolute top-0 right-[2px] w-[12px] h-[12px] content-[''] rounded-full bg-[#e50f0f]/90">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8px] leading-[8px] text-[#fff]">
              {notificationsIdList.length}
            </span>
          </div>
        ) : null}
      </button>
      {isOpen && notificationsData.length ? (
        <NotificationInfo notificationsData={notificationsData} />
      ) : null}
    </div>
  )
}

export default Notification
