import { create } from 'domain';
import { createContext, useState, useContext } from 'react';
import { AdvertContent, GlobalContent, GridFillContent, letterPointsDictionary, PointContent, powerDictionary, RackContextContent, SubmitContent, Tile, TileContextContent } from './definitions';
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
export const SubmitContext = createContext<SubmitContent>({
submit: false, // set a default value
setSubmit: () => {},
})
export const useSubmitContext = () => useContext(SubmitContext)

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

//sample create context
export const PointContext = createContext<PointContent>({
point: 0, // set a default value
setPoint: () => {},
})
export const usePointContext = () => useContext(PointContext)

export const powerDictionaryContext = createContext<powerDictionary>({
    doubleLetter: [[4,4]],
    tripleLetter: [[2,2],[2,6],[6,2],[6,6]],
    doubleWord: [[0,4],[4,0], [4,8],[8,4]],
    tripleWord: [[0,0],[0,8],[8,0],[8,8]]
})

export const letterPointsContext= createContext<letterPointsDictionary>({
    A:1,
    B:3,
    C:3,
    D:2,
    E:1,
    F:4,
    G:2,
    H:4,
    I:1,
    J:8,
    K:5,
    L:1,
    M:3,
    N:1,
    O:1,
    P:3,
    Q:10,
    R:1,
    S:1,
    T:1,
    U:1,
    V:4,
    W:4,
    X:8,
    Y:4,
    Z:10
})


