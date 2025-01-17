'use client';

import React, {Component, useEffect, useState} from 'react';
import { GridBase, letterPointsDictionary, Tile } from '../lib/definitions';
import { useContext } from 'react';
import { letterPointsContext, useGlobalContext, useGridFillContext, useRackContext, useSelectedTileContext } from '../lib/LevelContext';


export default function Rack ({grid}:{grid:GridBase})  {

  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  //selected tile change
  const { tile, setTile } = useSelectedTileContext()

  const {rack, setRack} = useRackContext()
  const { fill, setFill } = useGridFillContext()
  const gridStatus:Array<Array<string>> = fill;

  const letterPoints = useContext(letterPointsContext);


  const handleTileClick = (e:  React.MouseEvent<HTMLLIElement>, row: number, col: number) => {
    console.log("RACK TILE CLICK")

    let target = (e.target as HTMLElement)

    if (target.className == "tile-score" || target.className == "tile-letter") {
        target = target.parentNode ? (target.parentNode as HTMLLIElement) : target
    }

    var clickedTile: HTMLLIElement = (target as HTMLLIElement);

    var newTile: Tile = {
        letter: clickedTile.getElementsByClassName("tile-letter")[0].textContent ? clickedTile.getElementsByClassName("tile-letter")[0].textContent : " " ,
        row: row,
        col: col,
        html: clickedTile,
        from: "rack"
    }

    if (tile.html != null) {
      tile.html.classList.remove('selected');
    }
    if (clickedTile.classList.contains('selected')) {
      clickedTile.classList.remove('selected');
    } else {
      clickedTile.classList.add('selected');
    }

    setTile(newTile)

    
  };

  const handleTrayClick = () => {
    if (tile.from == "board" && tile.letter != " " && tile.letter != null) {
        let newRack = rack;
        newRack.push(tile.letter);
        setRack(newRack);
        if (tile.html != null) {
          tile.html.classList.remove('selected');

        }
       
        var newSelectedTile: Tile = {
            letter: " ",
            row: -1,
            col: -1,
            html: null,
            from: "start"
        }
    
        if (tile.html != null) {
          tile.html?.classList.remove('selected');
          tile.html.getElementsByClassName("space-letter")[0].textContent = " ";
        }
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
            <li key={indexCell} className="tile" onClick={(e)=> handleTileClick(e, indexRow, indexCell)} >
                <p className='tile-letter' >{`${rack[indexCell]}`}</p>
                <p className='tile-score' >{`${letterPoints[rack[indexCell] as keyof letterPointsDictionary]}`}</p>
               
                
            </li>
          ))}
        </ul>
      ))}
    <div className="tray" onClick={handleTrayClick}/>
    </main>
  );
};
