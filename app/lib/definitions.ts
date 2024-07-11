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
    html: HTMLLIElement | null,
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
export type SubmitContent = {
    submit: boolean
    setSubmit:(c: boolean) => void
}

//sample of changeable context
export type AdvertContent = {
    advert: string
    setAdvert:(c: string) => void
}

export type PointContent = {
    point: number
    setPoint:(c: number) => void
}

//sample of changeable context
export type GlobalContent = {
    copy: string
    setCopy:(c: string) => void
}

export type JSONValue =
| null
| boolean
| number
| string
| JSONValue[]
| { [key: string]: JSONValue }
;

export type letterPointsDictionary = {
    A:number,
    B:number,
    C:number,
    D:number,
    E:number,
    F:number,
    G:number,
    H:number,
    I:number,
    J:number,
    K:number,
    L:number,
    M:number,
    N:number,
    O:number,
    P:number,
    Q:number,
    R:number,
    S:number,
    T:number,
    U:number,
    V:number,
    W:number,
    X:number,
    Y:number,
    Z:number
}

export type powerDictionary = {
    doubleLetter: Array<Array<number>>,
    tripleLetter: Array<Array<number>>,
    doubleWord: Array<Array<number>>,
    tripleWord: Array<Array<number>>
}