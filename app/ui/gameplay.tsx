'use client';

import React, {useState} from "react";
import { AdvertContext, removeFromRack, GridFillContext, PointContext, RackContext, SelectedTileContext, SubmitContext, } from "../lib/LevelContext";
import { useContext } from "react";

import GridBase from "./gridBase";
import RackBase from "./rackBase";
import { Tile } from "../lib/definitions";

export default function Gameplay() {

    var value = " "
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

    var tileBag: string[] = [ "A", "A", "A", "A", "A", "A", "A", "A", "A", 
        "G", "G", "G", "M", "M", "S", "S", "S", "S","Y", "Y", "B", "B", "H", 
        "H", "N", "N","N", "N", "N", "N", "T", "T", "T", "T", "T", "T", "Z",
        "C", "C", "I", "I", "I", "I", "I", "I", "I", "I", "I", "O", "O", "O", 
        "O", "O", "O", "O", "O", "U", "U", "U", "U", "D", "D", "D", "D", "J", 
        "P", "P", "V", "V", "E", "E", "E", "E", "E", "E", "E", "E", "E", "E",
        "E", "E", "K", "Q", "W", "W", "F", "F", "L", "L", "L", "L", "R", "R",
        "R", "R","R", "R", "X","S","S"
    ]

    var isQ = false;
    var isU = false;

    const takeTileFromBag = () => {
        var tileIndex = Math.floor(Math.random() * tileBag.length)
        if (isQ && !isU) {
            tileIndex = tileBag.indexOf("U")
            isU = true
        }
        
        var randomLetter = tileBag[tileIndex];
        if (randomLetter == "Q") {
            isQ = true
        }
        tileBag = removeFromRack(randomLetter, tileBag)
        return randomLetter
    }
    var rackStart: string[] = [takeTileFromBag(), takeTileFromBag(), takeTileFromBag(), takeTileFromBag(), takeTileFromBag(), takeTileFromBag(), takeTileFromBag(), takeTileFromBag(), takeTileFromBag()]
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