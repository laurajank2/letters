'use client';

import React from 'react';
import CSS from "csstype";
import { GridBase } from '../lib/definitions';
import { useContext } from 'react';
import { useGridFillContext } from '../lib/LevelContext';
useGridFillContext

export default function Grid ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  const { fill, setFill } = useGridFillContext()
  const gridStatus:Array<Array<String>> = fill;

  console.log(gridStatus)

  const tripleWordStyle: CSS.Properties = {
    backgroundColor: "rgb(150, 227, 170)"
  }

  const doubleWordStyle: CSS.Properties = {
    backgroundColor: "rgb(212, 161, 209)"
  }

  const doubleLetterStyle: CSS.Properties = {
    backgroundColor: "rgb(138, 207, 207)"
  }

  const startStyle: CSS.Properties = {
    backgroundColor: "rgb(240, 141, 146)"
  }

  const normalStyle: CSS.Properties = {
    backgroundColor: "tan"
  }

  const chooseStyle = (indices: Array<Number>): CSS.Properties => {
    if ((indices[0] == 0 && indices[1] == 0) || (indices[0] == 0 && indices[1] == 8) || (indices[0] == 8 && indices[1] == 0) || (indices[0] == 8 && indices[1] == 8)) {
      return tripleWordStyle
    } else if ((indices[0] == 4 && indices[1] == 0) || (indices[0] == 0 && indices[1] == 4) || (indices[0] == 8 && indices[1] == 4) || (indices[0] == 4 && indices[1] == 8)) {
      return doubleWordStyle
    } else if ((indices[0] == 2 && indices[1] == 2) || (indices[0] == 2 && indices[1] == 6) || (indices[0] == 6 && indices[1] == 2) || (indices[0] == 6 && indices[1] == 6)) {
      return doubleLetterStyle
    } else if (indices[0] == 4 && indices[1] == 4) {
      return startStyle
    } 
    return normalStyle
  }

  const handleClick = (e:  React.MouseEvent<HTMLLIElement>) => {
    const space : HTMLLIElement = (e.target as HTMLLIElement);
    if (space.classList.contains('selected')) {
      space.classList.remove('selected');
    } else {
      space.classList.add('selected');
    }
  };

  return (
    <main>

      {rows.map((row, indexRow) => (
        
        <ul className="row" key={indexRow}>
          {cells.map((cell, indexCol) => (
            <li key={indexCol} id={`${indexCol}, ${indexRow}`} className="space" style={chooseStyle([indexCol, indexRow])} onClick={handleClick}>{`${gridStatus[indexRow][indexCol]}`}</li>
          ))}
        </ul>
      ))}

    </main>
  );
};
