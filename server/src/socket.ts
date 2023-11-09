import { Server as HttpServer } from "http";
import { Socket, Server } from "socket.io";
import { v4 } from "uuid";
import { Game, games } from "./game";

export class ServerSocket {
  public static instance: ServerSocket;
  public io: Server;

  /** Master list of all connected users */
  public users: { [uid: string]: string };

  constructor(server: HttpServer) {
    ServerSocket.instance = this;
    this.users = {};
    this.io = new Server(server, {
      serveClient: false,
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      cors: {
        origin: "*",
      },
    });

    this.io.on("connect", this.StartListenters);

    console.info("Socket IO started.");
  }

  StartListenters = (socket: Socket) => {
    console.info(`Message received from ${socket.id}`);

    socket.on(
      "handshake",
      (callback: (uid: string, users: string[]) => void) => {
        console.info(`Handshake received from ${socket.id}`);

        // Check if this is a reconnection
        const reconnected = Object.values(this.users).includes(socket.id);

        if (reconnected) {
          console.info("This user has reconnected.");

          const uid = this.GetUidFromSocketId(socket.id);
          const users = Object.values(this.users);

          if (uid) {
            console.info(`Sending callback for reconnect ...`);
            callback(uid, users);
            return;
          }
        }

        // Generate new user
        const uid = v4();
        this.users[uid] = socket.id;

        const users = Object.values(this.users);
        console.info(`Sending callback for handshake ...`);
        callback(uid, users);

        // Send new users to call connected users
        this.SendMessage(
          "user_connected",
          users.filter((id) => id !== socket.id),
          users
        );
      }
    );

    socket.on("disconnect", () => {
      console.info(`Disconnect received from: ${socket.id}`);

      const uid = this.GetUidFromSocketId(socket.id);

      if (uid) {
        delete this.users[uid];
        const users = Object.values(this.users);
        this.SendMessage("user_disconnected", users, socket.id);
      }
    });

    socket.on("create_game", (name, callback: (lobby_id: string) => void) => {
      const id = v4();
      new Game(name, id);
      callback(id);
    });

    socket.on("join_game", (game_id, callback: (success: boolean) => void) => {
      if (game_id in games) {
        socket.join(game_id);
        callback(true);
      } else {
        callback(false);
      }
    });
  };

  GetUidFromSocketId = (id: string) => {
    return Object.keys(this.users).find((uid) => this.users[uid] === id);
  };

  /**
   * Send a message through the socket
   * @param name The name of the event, ex: handshake
   * @param users List of socket id's
   * @param payload any information needed by the user for state updates
   */
  SendMessage = (name: string, users: string[], payload: Object) => {
    console.info(`Emmiting event: ${name} to ${users}`);
    users.forEach((id) =>
      payload ? this.io.to(id).emit(name, payload) : this.io.to(id).emit(name)
    );
  };
}
