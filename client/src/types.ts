export interface PlayerType {
  id: number;
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
