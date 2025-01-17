
import React from "react";
import { ChatType } from "@/types/chat";

type Props = {
  chat: ChatType;
};


export default function ChatListTile({ chat }: Props) {
  return (

    <div className="my-4">
    <div className="  flex  p-2 ">
      {/* Profile Image */}
      <div className="h-[54px] w-[54px] rounded-full overflow-hidden flex-shrink-0">
        <img
          className="h-full w-full object-cover"
          src={chat.imageUrl}
          alt="Profile"
        />
      </div>
  
      {/* Content Section */}
      <div className="flex flex-col  flex-grow ml-4">
        {/* Name and Time */}
        <div className="flex justify-between  items-center">
          <p className=" font-semibold text-[16px] text-gray-900">{chat.name}</p>
          <span className="text-[10px] text-black">{chat.time}</span>
        </div>
        {/* Message and Count */}
        <div className="flex justify-between items-center mt-2">
          <p className="text-gray-700 text-[12px] truncate">{chat.message}</p>
          <span className="flex items-center justify-center text-[10px] h-[14px] w-[14px] bg-black text-white rounded-full">
  {chat.messageCount}
</span>
        </div>
      </div>
    </div>
  </div>
  

   
    
  );
};

