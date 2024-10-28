import { useSocket } from "@/context/SocketContext";

const CallNotification = ({}) => {
  const { ongoingCall } = useSocket();
  if (!ongoingCall?.isRinging) return;

  return (
    <main>
      <section>
        <div className="absolute"></div>
      </section>
    </main>
  );
};

export default CallNotification;
