import { io } from "socket.io-client";

const socket = io("https://interview-app-v8ez.onrender.com/", {
  withCredentials: true,
  transports: ["websocket"],
});

export default socket;
