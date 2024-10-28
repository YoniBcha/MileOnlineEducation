"use client";

import { useSocket } from "@/context/SocketContext";
import { useUser } from "@clerk/nextjs";
import Avator from "./Avator";

const ListOnlineUsers = () => {
  const { user } = useUser();
  const { onlineUsers, handlCall } = useSocket();

  return (
    <main className="flex items-center pb-2 border-b border-gray-300 w-full">
      {onlineUsers &&
        onlineUsers.map((onlineUsers) => {
          if (onlineUsers.profile.id === user?.id) return null; //this line makes remove us from the online user

          return (
            <section
              key={onlineUsers.userId}
              onClick={() => handlCall(onlineUsers)}
              className="flex items-center flex-col gap-1 cursor-pointer"
            >
              <Avator src={onlineUsers.profile.imageUrl} />
              <div className="flex flex-col gap-5">
                <div className="font-bold text-sm text-black">
                  {onlineUsers.profile.firstName?.split("  ")[0]}
                </div>
              </div>
            </section>
          );
        })}
    </main>
  );
};

export default ListOnlineUsers;
