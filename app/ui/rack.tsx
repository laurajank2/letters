'use client';

import React, {Component, useState} from 'react';
import { GridBase, Tile } from '../lib/definitions';
import { useContext } from 'react';
import { useGlobalContext, useRackContext, useSelectedTileContext } from '../lib/LevelContext';


export default function Rack ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);
  console.log("rerendered")

  //selected tile change
  const { tile, setTile } = useSelectedTileContext()

  const {rack, setRack} = useRackContext()



  const handleTileClick = (e:  React.MouseEvent<HTMLLIElement>, row: number, col: number) => {

    const tile : HTMLLIElement = (e.target as HTMLLIElement);

    var newTile: Tile = {
        letter: tile.textContent,
        row: row,
        col: col,
        html: tile,
        from: "rack"
    }
    

    setTile(newTile)

    if (tile.classList.contains('selected')) {
      tile.classList.remove('selected');
    } else {
      tile.classList.add('selected');
    }
  };

  const handleTrayClick = () => {
    if (tile.from == "board" && tile.letter != " " && tile.letter != null) {
        console.log("old rack: " + rack)
        let newRack = rack;
        newRack.push(tile.letter);
        setRack(newRack);
        tile.html?.classList.remove('selected');

        var newSelectedTile: Tile = {
            letter: " ",
            row: -1,
            col: -1,
            html: null,
            from: "start"
        }
    
        tile.html?.classList.remove('selected');
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

