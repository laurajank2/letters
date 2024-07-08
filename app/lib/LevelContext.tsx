import { create } from 'domain';
import { createContext, useState, useContext } from 'react';
import { AdvertContent, GlobalContent, GridFillContent, RackContextContent, Tile, TileContextContent } from './definitions';
import React from 'react';

//tracks spaces filled in grid
var value = ' '
var spacesFilledVar = [...Array(9)].map(e => Array(9).fill(value)); 

export const GridFillContext = createContext<GridFillContent>({
fill: spacesFilledVar, // set a default value
setFill: () => {},
})
export const useGridFillContext = () => useContext(GridFillContext)

//tracks selected tile
const dummyLi: HTMLLIElement = document.createElement('li')
var tile: Tile = {
    letter: " ",
    row: -1,
    col: -1,
    html: dummyLi,
    from: "start"
}
export const SelectedTileContext = createContext<TileContextContent>({
tile: tile, // set a default value
setTile: () => {},
})
export const useSelectedTileContext = () => useContext(SelectedTileContext)

//tracks rack tiles
var rack: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I"]
export const RackContext = createContext<RackContextContent>({
rack: rack, // set a default value
setRack: () => {},
})
export const useRackContext = () => useContext(RackContext)

//sample create context
export const AdvertContext = createContext<AdvertContent>({
advert: 'Make Words!', // set a default value
setAdvert: () => {},
})
export const useAdvertContext = () => useContext(AdvertContext)

//sample create context
export const MyGlobalContext = createContext<GlobalContent>({
copy: 'Hello World', // set a default value
setCopy: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)


export const removeFromRack = (character: string, rack: Array<string>) => {
    for (let i = 0; i < rack.length; i++) {
        if (rack[i] == character) {
            const newRack = rack.slice(0,i).concat( rack.slice(i+1))
            return newRack
        }
    }
    return rack
}


