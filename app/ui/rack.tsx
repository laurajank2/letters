'use client';

import React from 'react';
import { GridBase, Tile } from '../lib/definitions';
import { useContext } from 'react';
import { useGlobalContext, useRackContext, useSelectedTileContext } from '../lib/LevelContext';

export default function Rack ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  //selected tile change
  const { tile, setTile } = useSelectedTileContext()

  const {rack, setRack} = useRackContext()

  const handleClick = (e:  React.MouseEvent<HTMLLIElement>, row: number, col: number) => {

    const tile : HTMLLIElement = (e.target as HTMLLIElement);

    var newTile: Tile = {
        letter: tile.textContent,
        row: row,
        col: col,
        html: tile
    }
    

    setTile(newTile)

    if (tile.classList.contains('selected')) {
      tile.classList.remove('selected');
    } else {
      tile.classList.add('selected');
    }
  };

  return (
    <main>

      {rows.map((row, indexRow) => (
        <ul className="row" key={indexRow}>
          {cells.map((cell, indexCell) => (
            <li key={indexCell} className="tile" onClick={(e)=> handleClick(e, indexRow, indexCell)} >{`${rack[indexCell]}`}</li>
          ))}
        </ul>
      ))}

    </main>
  );
};
