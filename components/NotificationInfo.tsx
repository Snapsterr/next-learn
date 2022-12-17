import { CheckCircleIcon, MinusCircleIcon } from "@heroicons/react/outline"
import { DocumentData } from "firebase/firestore"
import React from "react"
import { Notifications } from "../typings"

const NotificationInfo = ({ notificationsData }: DocumentData) => {
  return (
    <div className="absolute top-[40px] -left-[100px]">
      <div className="tooltip scrollbarModalHeader w-[200px] max-h-[300px] overflow-y-auto bg-[rgba(44,44,44,0.5)] rounded-[5px]">
        <div className="flex flex-col justify-center items-start">
          {notificationsData.map((notification: Notifications, i: number) => (
            <div
              key={i}
              className="w-full min-h-[50px] [&:not(last)]:border-b-[1px] border-[#fff]/50 last:border-0"
            >
              {notification.type === "added" ? (
                <div className="w-full p-2 flex flex-row justify-start items-center">
                  <CheckCircleIcon className="h-auto w-[40px] text-[#22e30b]" />
                  <div className="pl-[6px] text-[14px] leading-[15px]">
                    {notification.original_title || notification.original_name}{" "}
                    has been{" "}
                    <span className="text-[#22e30b] font-bold">
                      {notification.type}
                    </span>{" "}
                    to your favourites
                  </div>
                </div>
              ) : (
                <div className="w-full p-2 flex flex-row justify-start items-center">
                  <MinusCircleIcon className="h-auto w-[40px] text-[#db0707]/70" />
                  <div className="pl-[6px] text-[14px] leading-[15px]">
                    {notification.original_title || notification.original_name}{" "}
                    has been{" "}
                    <span className="text-[#db0707]/70 font-bold">
                      {notification.type}
                    </span>{" "}
                    from your favourites
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NotificationInfo
