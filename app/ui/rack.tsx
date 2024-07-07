'use client';

import React from 'react';
import { GridBase } from '../lib/definitions';
import { useContext } from 'react';
import { useGlobalContext } from '../lib/LevelContext';

export default function Rack ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  //sample context change
  const { copy, setCopy } = useGlobalContext()
  console.log("former copy: " + copy);

  const handleClick = (e:  React.MouseEvent<HTMLLIElement>) => {
    //sample context change
    setCopy("new sample")

    console.log("new copy: " + copy)
    const tile : HTMLLIElement = (e.target as HTMLLIElement);

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
            <li key={indexCell} className="tile" onClick={handleClick} >{`${indexCell}`}</li>
          ))}
        </ul>
      ))}

    </main>
  );
};
