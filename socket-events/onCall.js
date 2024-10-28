import { io } from "../server.js";

const onCall = async (partcipants) => {
  if (partcipants.receiver.socketid) {
    io.to(partcipants.receiver.socketid).emit("incomingCall", partcipants);
  }
};

export default onCall;
