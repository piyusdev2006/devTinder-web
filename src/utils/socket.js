import { io } from "socket.io-client";
import { BASE_URL } from "./constants";

export const createSocketConnection = () => {
    // Basically this a backend URL where u want to connect your socket telling the client to connect to backend system

    if (location.hostname === "localhost") {
      return io(BASE_URL);
    } else {
      return io("/", { path: "/api/socket.io" });
    }
}