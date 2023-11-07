import { useState, useEffect } from "react";
import "./Board.css";
import { PlayerType, TileType, TileState } from "../../types";

const Board = ({ playerData }: { playerData: PlayerType[] }) => {
  const [tiles, setTiles] = useState<TileType[]>([]);

  useEffect(() => {
    const tileAmout: number = 25;
    const arr: TileType[] = [];
    for (let i = 1; i <= tileAmout; i++) {
      arr.push({
        tile: i,
        state: TileState.One,
      });
    }
    setTiles(arr);
  }, []);

  return (
    <>
      <div className='board'>
        {tiles.map((tile: TileType) => {
          if (tile.state == TileState.Empty) {
            return <div className='tile' key={tile.tile}></div>;
          } else {
            return (
              <div className='tile' key={tile.tile}>
                {playerData.map((player: PlayerType) =>
                  player.tile == tile.tile ? (
                    <div className='player' key={player.id} />
                  ) : null
                )}
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default Board;
