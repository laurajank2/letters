'use client';

import React, {useState} from "react";
import { GridFillContext, RackContext, SelectedTileContext, } from "../lib/LevelContext";
import { useContext } from "react";

import GridBase from "./gridBase";
import RackBase from "./rackBase";
import { Tile } from "../lib/definitions";

export default function Gameplay() {

    var value = ' '
    var spacesFilledVar = [...Array(9)].map(e => Array(9).fill(value)); 
    const [fill, setFill] = useState<Array<Array<string>>>(spacesFilledVar);

    var tileStart: Tile = {
        letter: " ",
        row: -1,
        col: -1,
        html: null,
        from: "start"
    };
    const [tile, setTile] = useState<Tile>(tileStart)

    var rackStart: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    const [rack, setRack] = useState<Array<string>>(rackStart)
    
    return (
        <GridFillContext.Provider value={{fill, setFill}}>
            <SelectedTileContext.Provider value={{tile, setTile}}>
                <RackContext.Provider value = {{rack, setRack}}>
                    <GridBase />
                    <RackBase />
                </RackContext.Provider>
            </SelectedTileContext.Provider>
        </GridFillContext.Provider>
    )
}