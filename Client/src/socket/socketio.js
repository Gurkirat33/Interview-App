import { io } from "socket.io-client";

const socket = io("https://interview-app-server.vercel.app/");

export default socket;
