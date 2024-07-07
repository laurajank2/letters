//contains definitions of types

export type GridBase = {
    cells: Number,
    rows: Number
};

export type GridFillContent = {
    fill: Array<Array<String>>
    setFill: (Fill: Array<Array<String>>) => void;
};

export type Tile = {
    letter: String | null,
    row: Number,
    col: Number
}

export type TileContextContent = {
    tile: Tile;
    setTile: (Tile: Tile) => void;
};

//sample of changeable context
export type GlobalContent = {
    copy: string
    setCopy:(c: string) => void
  }