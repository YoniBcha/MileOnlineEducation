import { OngoingCall, Partcipants, SocketUser } from "@/types";
import { useUser } from "@clerk/nextjs";
import { initialize } from "next/dist/server/lib/render-server";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { io, Socket } from "socket.io-client";

interface iSocketConext {
  onlineUsers: SocketUser[] | null;
  handlCall: (user: SocketUser) => void;
}

export const SocketContext = createContext<iSocketConext | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user } = useUser();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isSocketConnected, setIsSocketConnected] = useState(false);
  const [onlineUsers, setOnlineUser] = useState<SocketUser[] | null>();
  const [ongoingCall, setOngoingCall] = useState<OngoingCall | null>(null);
  const currentSocketUser = onlineUsers?.find(
    (onlineUser) => onlineUser.userId === user?.id
  );

  const handlCall = useCallback(
    (user: SocketUser) => {
      if (!currentSocketUser || !socket) return;
      const partcipants = { caller: currentSocketUser, receiver: user };
      setOngoingCall({
        partcipants,
        isRinging: false,
      });

      socket?.emit("call", partcipants);
    },
    [socket, currentSocketUser, ongoingCall]
  );

  const onIncomingCall = useCallback(
    (partcipants: Partcipants) => {
      setOngoingCall({
        partcipants,
        isRinging: true,
      });
    },
    [socket, user, ongoingCall]
  );

  //   initialize socket
  useEffect(() => {
    const newSocket = io;
    setSocket(newSocket);
    return () => {
      newSocket.disconnect;
    };
  }, [user]);

  useEffect(() => {
    if (socket == null) return;

    if (socket.connected) {
      onConnect();
    }
    function onConnect() {
      setIsSocketConnected(true);
    }
    function onDisconnect() {
      setIsSocketConnected(false);
    }
    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !isSocketConnected) return;
    socket.emit("addNewUser", user);
    socket.on("getUser", (res) => {
      setOnlineUser(res);
    });

    return () => {
      socket.off("getUser", (res) => {
        setOnlineUser(res);
      });
    };
  }, [socket, isSocketConnected, user]);

  //calls
  useEffect(() => {
    if (!socket || !isSocketConnected) return;
    socket.on("incomingCall", onIncomingCall);
  }, [socket, isSocketConnected, user, onIncomingCall]);

  return (
    <SocketContext.Provider value={{ onlineUsers, handlCall }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === null) {
    throw new Error("useSocket must be used");
  }
  return context;
};
