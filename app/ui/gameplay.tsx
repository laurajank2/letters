'use client';

import React, {useState} from "react";
import { AdvertContext, GridFillContext, PointContext, RackContext, SelectedTileContext, SubmitContext, } from "../lib/LevelContext";
import { useContext } from "react";

import GridBase from "./gridBase";
import RackBase from "./rackBase";
import { Tile } from "../lib/definitions";

export default function Gameplay() {

    var value = " "
    var spacesFilledVar = [...Array(9)].map(e => Array(9).fill(value)); 
    const [fill, setFill] = useState<Array<Array<string>>>(spacesFilledVar);

    const dummyLi: HTMLLIElement = document.createElement('li')
    var tileStart: Tile = {
        letter: " ",
        row: -1,
        col: -1,
        html: dummyLi,
        from: "start"
    };
    const [tile, setTile] = useState<Tile>(tileStart)

    var rackStart: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
    const [rack, setRack] = useState<Array<string>>(rackStart)

    const [advert, setAdvert] = useState<string>("Make words!")

    const [submit, setSubmit] = useState<boolean>(false)

    const [point, setPoint] = useState<number>(0)


    
    return (
        <GridFillContext.Provider value={{fill, setFill}}>
            <SelectedTileContext.Provider value={{tile, setTile}}>
                <RackContext.Provider value = {{rack, setRack}}>
                    <AdvertContext.Provider value= {{advert, setAdvert}}>
                        <PointContext.Provider value = {{point, setPoint}}>
                            <h2>Point total: {`${point}`}</h2>
                            <GridBase />
                            <RackBase />
                            <h2 className="advert">{advert}</h2>
                        </PointContext.Provider>
                    </AdvertContext.Provider>
                </RackContext.Provider>
            </SelectedTileContext.Provider>
        </GridFillContext.Provider>
    )
}