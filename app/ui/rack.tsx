'use client';

import React, {Component, useState} from 'react';
import { GridBase, Tile } from '../lib/definitions';
import { useContext } from 'react';
import { useGlobalContext, useGridFillContext, useRackContext, useSelectedTileContext } from '../lib/LevelContext';


export default function Rack ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);
  console.log("rerendered")

  //selected tile change
  const { tile, setTile } = useSelectedTileContext()

  const {rack, setRack} = useRackContext()
  const { fill, setFill } = useGridFillContext()
  const gridStatus:Array<Array<string>> = fill;



  const handleTileClick = (e:  React.MouseEvent<HTMLLIElement>, row: number, col: number) => {

    const clickedTile : HTMLLIElement = (e.target as HTMLLIElement);

    var newTile: Tile = {
        letter: clickedTile.textContent,
        row: row,
        col: col,
        html: clickedTile,
        from: "rack"
    }
    

    setTile(newTile)

    if (clickedTile.classList.contains('selected')) {
      clickedTile.classList.remove('selected');
    } else {
      tile.html.classList.remove('selected');
      clickedTile.classList.add('selected');
    }
  };

  const handleTrayClick = () => {
    if (tile.from == "board" && tile.letter != " " && tile.letter != null) {
        console.log("old rack: " + rack)
        let newRack = rack;
        newRack.push(tile.letter);
        setRack(newRack);
        tile.html?.classList.remove('selected');

        const dummyLi: HTMLLIElement = document.createElement('li')
        var newSelectedTile: Tile = {
            letter: " ",
            row: -1,
            col: -1,
            html: dummyLi,
            from: "start"
        }
    
        tile.html?.classList.remove('selected');
        tile.html.textContent = " ";
        fill[tile.row][tile.col] = " ";
        const newFill = fill;
        setFill(newFill);
        setTile(newSelectedTile);

    }
  }

  return (
    <main>

      {rows.map((row, indexRow) => (
        <ul className="row" key={indexRow}>
          {cells.map((cell, indexCell) => (
            <li key={indexCell} className="tile" onClick={(e)=> handleTileClick(e, indexRow, indexCell)} >{`${rack[indexCell]}`}</li>
          ))}
        </ul>
      ))}
    <div className="tray" onClick={handleTrayClick}/>
    </main>
  );
};

