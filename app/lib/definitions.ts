//contains definitions of types

export type GridBase = {
    cells: number,
    rows: number
};

export type GridFillContent = {
    fill: Array<Array<string>>
    setFill: (Fill: Array<Array<string>>) => void;
};

export type Tile = {
    letter: string | null,
    row: number,
    col: number
    html: HTMLLIElement | null
    from: string
}

export type TileContextContent = {
    tile: Tile;
    setTile: (Tile: Tile) => void;
};

export type RackContextContent = {
    rack: string[];
    setRack: (rack: string[]) => void;
};

//sample of changeable context
export type GlobalContent = {
    copy: string
    setCopy:(c: string) => void
}