'use client';

import React from 'react';
import { GridBase } from '../lib/definitions';

export default function Grid ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  const handleClick = (e:  React.MouseEvent<HTMLLIElement>) => {
    const item : HTMLLIElement = (e.target as HTMLLIElement);
    if (item.classList.contains('selected')) {
      item.classList.remove('selected');
    } else {
      item.classList.add('selected');
    }
  };

  return (
    <main>
      <h1>Grid</h1>

      {rows.map((row, index) => (
        <ul className="row" key={index}>
          {cells.map((cell, index) => (
            <li key={index} className="item" onClick={handleClick} />
          ))}
        </ul>
      ))}

    </main>
  );
};
