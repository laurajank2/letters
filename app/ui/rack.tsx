'use client';

import React, {Component, useState} from 'react';
import { GridBase, letterPointsDictionary, Tile } from '../lib/definitions';
import { useContext } from 'react';
import { letterPointsContext, useGlobalContext, useGridFillContext, useRackContext, useSelectedTileContext } from '../lib/LevelContext';


export default function Rack ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);
  console.log("rack rerendered")

  //selected tile change
  const { tile, setTile } = useSelectedTileContext()

  const {rack, setRack} = useRackContext()
  const { fill, setFill } = useGridFillContext()
  const gridStatus:Array<Array<string>> = fill;

  const letterPoints = useContext(letterPointsContext);


  const handleTileClick = (e:  React.MouseEvent<HTMLLIElement>, row: number, col: number) => {

    let target = (e.target as HTMLElement)

    if (target.className == "tile-score" || target.className == "tile-letter") {
        target = target.parentNode ? (target.parentNode as HTMLLIElement) : target
    }

    const clickedTile : HTMLLIElement = (target as HTMLLIElement);

    var newTile: Tile = {
        letter: clickedTile.textContent ? clickedTile.textContent[0] : " " ,
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
        tile.html.getElementsByClassName("space-letter")[0].textContent = " ";
        fill[tile.row][tile.col] = " ";
        const newFill = fill;
        setFill(newFill);
        setTile(newSelectedTile);

    }
  }

  console.log("rack " + rack)
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
