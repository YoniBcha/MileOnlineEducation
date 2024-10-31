"use client";

import { useSocket } from "@/context/SocketContext";

const CallNotification = ({}) => {
  const { ongoingCall } = useSocket();
  if (!ongoingCall?.isRinging) return;

  return (
    <main className="">
      <section className="">
        <div className="absolute bg-slate-500 bg-opacity-70 w-screen h-screen top-0 left-0 flex items-center justify-center">
          some one is calling
        </div>
      </section>
    </main>
  );
};

export default CallNotification;
