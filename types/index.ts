import { User } from "@clerk/nextjs/server";

export type SocketUser = {
  userId: string;
  socketId: string;
  profile: User;
};

export type OngoingCall = {
  partcipants: Partcipants;
  isRinging: boolean;
};

export type Partcipants = {
  caller: SocketUser;
  receiver: SocketUser;
};
