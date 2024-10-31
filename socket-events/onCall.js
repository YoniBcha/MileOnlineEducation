import { io } from "../server.js";

const onCall = async (partcipants) => {
  if (partcipants.receiver.socketId) {
    io.to(partcipants.receiver.socketId).emit("incomingCall", partcipants);
  }
};

export default onCall;
