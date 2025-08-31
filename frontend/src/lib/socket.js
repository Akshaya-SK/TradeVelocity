import { io } from "socket.io-client";

const socket = io("http://localhost:5000", { path: "/socket.io", transports: ["websocket"], reconnection: true, autoConnect: true, withCredentials: false, forceNew: false, timeout: 20000 });

export default socket;
