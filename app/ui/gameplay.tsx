'use client';

import React, {useEffect, useState} from "react";
import { AdvertContext, removeFromRack, GridFillContext, PointContext, RackContext, SelectedTileContext, SubmitContext, tileRackContext, } from "../lib/LevelContext";
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
    

    
    const rackStart = useContext(tileRackContext);
    console.log("gameplay rendered and rack is: " + rackStart)
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