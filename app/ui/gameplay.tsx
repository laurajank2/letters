'use client';

import React, {useState} from "react";
import { GridFillContext } from "../lib/LevelContext";
import { useContext } from "react";

import GridBase from "./gridBase";
import RackBase from "./rackBase";

export default function Gameplay() {
    var value = ' '
    var spacesFilledVar = [...Array(9)].map(e => Array(9).fill(value)); 
    
    const [fill, setFill] = useState<Array<Array<String>>>(spacesFilledVar);
    
    return (
        <GridFillContext.Provider value={{fill, setFill}}>
            <GridBase />
            <RackBase />
        </GridFillContext.Provider>
    )
}