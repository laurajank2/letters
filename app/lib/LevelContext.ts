import { create } from 'domain';
import { createContext, useState, useContext } from 'react';
import { GlobalContent, GridFillContent, Tile, TileContextContent } from './definitions';

//tracks spaces filled in grid
var value = ' '
var spacesFilledVar = [...Array(9)].map(e => Array(9).fill(value)); 

export const GridFillContext = createContext<GridFillContent>({
fill: spacesFilledVar, // set a default value
setFill: () => {},
})
export const useGridFillContext = () => useContext(GridFillContext)

//tracks selected tile
var tile: Tile = {
    letter: "-1",
    row: -1,
    col: -1
}
export const SelectedTileContext = createContext<TileContextContent>({
tile: tile, // set a default value
setTile: () => {},
})
export const useSelectedTileContext = () => useContext(SelectedTileContext)



//sample create context
export const MyGlobalContext = createContext<GlobalContent>({
copy: 'Hello World', // set a default value
setCopy: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)
