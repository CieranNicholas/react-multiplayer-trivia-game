import { useState, useEffect, useContext } from "react";

import { PlayerType } from "../../types";

import { useParams } from "react-router-dom";

import SocketContext from "../../contexts/Socket/Context";

import "./game.css";

import Board from "../../Components/Board/Board";

const Game = () => {
  const { socket } = useContext(SocketContext).SocketState;

  const [conntected, setConnected] = useState(false);
  const [playerData, setPlayerData] = useState<PlayerType[]>([]);

  const params = useParams();
  const { lobby } = params;

  useEffect(() => {
    // placeholder before I get a node js server running for player data
    setPlayerData([
      {
        id: 1,
        tile: 1,
      },
      {
        id: 2,
        tile: 1,
      },
      {
        id: 3,
        tile: 1,
      },
      {
        id: 4,
        tile: 1,
      },
    ]);

    socket?.emit("join_game", lobby, (success: boolean) => {
      console.log(success, "yaba");
      setConnected(success);
    });
  }, []);

  if (lobby) {
    if (conntected) {
      return <Board playerData={playerData} />;
    } else {
      return <h1>Connecting . . .</h1>;
    }
  } else {
    return <h1>Lobby not found . . .</h1>;
  }
};

export default Game;
