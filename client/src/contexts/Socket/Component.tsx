import React, {
  PropsWithChildren,
  useReducer,
  useState,
  useEffect,
} from "react";
import {
  SocketContextProvider,
  SocketReducer,
  defaulSocketContextState,
} from "./Context";
import { useSocket } from "../../hooks/useSocket";
import { useFetcher } from "react-router-dom";

export interface ISocketContextComponentProps extends PropsWithChildren {}

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;

  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaulSocketContextState
  );
  const [loading, setLoading] = useState(true);

  const socket = useSocket("ws://localhost:1337", {
    reconnectionAttempts: 5,
    reconnectionDelay: 5000,
    autoConnect: false,
  });

  useEffect(() => {
    // Connect to the web socket
    socket.connect();

    // Save the socket in context
    SocketDispatch({ type: "update_socket", payload: socket });

    // Start the event listeners
    StartListeners();

    // Send the handshake
    SendHandshake();
  }, []);

  const StartListeners = () => {
    socket.on("user_connected", (users: string[]) => {
      console.info("User connected, new user list recieved");
      SocketDispatch({ type: "update_users", payload: users });
    });

    socket.on("user_disconnected", (uid: string) => {
      console.info("User disconnected");
      SocketDispatch({ type: "remove_user", payload: uid });
    });

    socket.io.on("reconnect", (attempt) => {
      console.info("Reconected on attempt" + attempt);
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconection attempt " + attempt);
    });

    socket.io.on("reconnect_error", (error) => {
      console.info("Reconection error: ", error);
    });

    socket.io.on("reconnect_failed", () => {
      console.info("Reconect failed");
      alert("We are unable to connect you to the web socket");
    });
  };
  const SendHandshake = () => {
    console.info("Sending Handshake");

    socket.emit("handshake", (uid: string, users: string[]) => {
      console.log("User handshake callback message recieved");
      SocketDispatch({ type: "update_uid", payload: uid });
      SocketDispatch({ type: "update_users", payload: users });

      setLoading(false);
    });
  };

  if (loading) return <p>Loading Socket IO . . .</p>;

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
