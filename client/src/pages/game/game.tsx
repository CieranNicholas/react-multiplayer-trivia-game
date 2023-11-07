import { useState, useEffect } from "react";

import { PlayerType } from "../../types";

import { useParams } from "react-router-dom";

import "./game.css";

import Board from "../../Components/Board/Board";

const Game = () => {
  const [playerData, setPlayerData] = useState<PlayerType[]>([]);

  const [isConnected, setIsConnected] = useState(false);

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
  }, []);

  return (
    <>
      {isConnected ? (
        <Board playerData={playerData} />
      ) : (
        <>
          <h1>Connecting . . .</h1>
        </>
      )}
    </>
  );
};

export default Game;
