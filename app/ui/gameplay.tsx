'use client';

import React, {useState} from "react";
import { GridFillContext, SelectedTileContext, useSelectedTileContext } from "../lib/LevelContext";
import { useContext } from "react";

import GridBase from "./gridBase";
import RackBase from "./rackBase";
import { Tile } from "../lib/definitions";

export default function Gameplay() {

    var value = ' '
    var spacesFilledVar = [...Array(9)].map(e => Array(9).fill(value)); 
    const [fill, setFill] = useState<Array<Array<string>>>(spacesFilledVar);

    var tileStart: Tile = {
        letter: "-1",
        row: -1,
        col: -1
    };
    const [tile, setTile] = useState<Tile>(tileStart)
    
    return (
        <GridFillContext.Provider value={{fill, setFill}}>
            <SelectedTileContext.Provider value={{tile, setTile}}>
                <GridBase />
                <RackBase />
            </SelectedTileContext.Provider>
        </GridFillContext.Provider>
    )
}