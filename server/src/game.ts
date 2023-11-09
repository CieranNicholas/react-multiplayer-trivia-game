import { v4 } from "uuid";
import axios from "axios";

export interface PlayerType {
  id: string;
  tile: number;
}

export interface TileType {
  tile: number;
  state: TileState;
}

export enum TileState {
  Empty,
  One,
  Two,
  Three,
  Four,
}

enum Categories {
  Film = 11,
  General = 9,
  Music = 12,
  Television = 14,
  Games = 15,
  Sports = 21,
}

enum Difficulties {
  Easy = "easy",
  Medium = "medium",
  Hard = "hard",
}

export let games: { [lobby_id: string]: {} } = {};

export class Game {
  public static instance: Game;

  private game_name: string;
  private players: { [uid: string]: string };
  private playerCount: number;
  private tileData: TileType[];
  private playerData: PlayerType[];

  constructor(game_name: string, game_id: string) {
    Game.instance = this;

    games[game_id] = this;

    this.game_name = game_name;
    this.players = {};
    this.playerCount = 0;
    this.tileData = this.initTileData();
    this.playerData = [];
  }

  initTileData = () => {
    const tileAmout: number = 25;
    const arr: TileType[] = [];
    for (let i = 1; i <= tileAmout; i++) {
      arr.push({
        tile: i,
        state: TileState.Empty,
      });
    }
    return arr;
  };

  addPlayer = (uid: string) => {
    this.playerData.push({
      id: uid,
      tile: 1,
    });
  };

  removePlayer = (uid: string) => {
    this.playerData = this.playerData.filter((obj) => obj.id !== uid);
  };

  updatePlayerPosition = (uid: string, roll: number) => {
    const playerIndex = this.playerData.findIndex((obj) => obj.id == uid);
    const currentPos = this.playerData[playerIndex].tile;
    const targetPos = (this.playerData[playerIndex].tile += roll);

    if (targetPos >= this.tileData.length) {
      // WINNER
    } else {
      this.playerData[playerIndex].tile = targetPos;
    }
  };

  rollDice = () => {
    return Math.floor(Math.random() * (6 - 1 + 1) + 1);
  };

  fetchQuestion = async (category: number, difficulty: string) => {
    const url = `https://opentdb.com/api.php?amount=1&category=${category}&difficulty=${difficulty}&type=multiple`;
    const res = await axios.get(url);
    console.log(res.data.results);
    return res.data.results;
  };
}
