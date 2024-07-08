'use client';

import React from 'react';
import CSS from "csstype";
import { GridBase, Tile } from '../lib/definitions';
import { useContext } from 'react';
import { useGridFillContext, useRackContext, useSelectedTileContext, removeFromRack, useAdvertContext } from '../lib/LevelContext';

export default function Grid ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  const {rack, setRack} = useRackContext();
  const { fill, setFill } = useGridFillContext();
  const gridStatus:Array<Array<string>> = fill;

  const {advert, setAdvert} = useAdvertContext();

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

  const selectedStyle: CSS.Properties = {
    backgroundColor: "blue"
  }

  const chooseStyle = (indices: Array<number>): CSS.Properties => {
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

//selected tile change
const { tile, setTile } = useSelectedTileContext()

const checkValidity = (space:  HTMLLIElement, row: number, col: number) => {
  if (rack.length == 9) {
    if (row != 4 || col != 4) {
      const newAdvert = "Place first tile in the center of the board"
      setAdvert(newAdvert);
      return false;
    } else {
      const newAdvert = "Make words!"
      setAdvert(newAdvert);
      return true;
    }
  } else {
    if (fill[row+1][col] == " " && fill[row-1][col] == " " && fill[row][col+1] == " " && fill[row][col-1] == " ") {
      const newAdvert = "Place tile next to one on the board"
      setAdvert(newAdvert);
      return false;
    } else {
      const newAdvert = "Make words!"
      setAdvert(newAdvert);
      return true;
    }
  }
}

const putTileOnBoardFromRack = (space:  HTMLLIElement, row: number, col: number) => {

  if (!checkValidity(space, row, col)) {
    return
  }
  
  var newSelectedTile: Tile = {
    letter: space.textContent,
    row: row,
    col: col,
    html: space,
    from: (space.textContent == " ") ? "start" : "board"
  }
  //set space content to the tile's letter
  space.textContent = tile.letter ? tile.letter : " ";
  //set the fill grid to the tile's letter
  fill[row][col] = tile.letter ? tile.letter : " ";
  const newFill = fill;
  setFill(newFill);
  
  //remove the tile from rack
  if (tile.from == "rack") {
    if (tile.html?.classList.contains('selected')) {
      tile.html?.classList.remove('selected');
      const newRack = removeFromRack(tile.letter? tile.letter: "", rack);
      setRack(newRack);
    }
  }
  
  setTile(newSelectedTile);

}

const takeTileFromBoard = (space:  HTMLLIElement, row: number, col: number) => {
  var newSelectedTile: Tile = {
    letter: space.textContent,
    row: row,
    col: col,
    html: space,
    from: (space.textContent == " ") ? "start" : "board"
  }

  tile.html?.classList.remove('selected');
  space.classList.add('selected');
  setTile(newSelectedTile);
  
}

const boardToBoard =  (space:  HTMLLIElement, row: number, col: number) => {
  var newSelectedTile: Tile = {
    letter: space.textContent,
    row: row,
    col: col,
    html: space,
    from: (space.textContent == " ") ? "start" : "board"
  }

  tile.html?.classList.remove('selected');

  //set space content to the tile's letter
  space.textContent = tile.letter ? tile.letter : " "
  //set the fill grid to the tile's letter
  fill[row][col] = tile.letter ? tile.letter : " "



  space.textContent = newSelectedTile.letter ? newSelectedTile.letter : " "

  fill[tile.row][tile.col] = newSelectedTile.letter ? newSelectedTile.letter : " "

  const dummyLi: HTMLLIElement = document.createElement('li')
  var neutralTile: Tile = {
    letter: " ",
    row: -1,
    col: -1,
    html: dummyLi,
    from: "start"
  }

  const newFill = fill;
  setFill(newFill);
  setTile(neutralTile);
}

const handleClick = (e:  React.MouseEvent<HTMLLIElement>, row: number, col: number) => {

  const space : HTMLLIElement = (e.target as HTMLLIElement);


  if (tile.from == "rack") {
    putTileOnBoardFromRack(space, row, col);
  } else if (tile.from == "start") {
    takeTileFromBoard(space,row,col);
  } else if (tile.from == "board") {
    boardToBoard(space, row, col);
  }
  
};

  return (
    <main>

      {rows.map((row, indexRow) => (
        
        <ul className="row" key={indexRow}>
          {cells.map((cell, indexCol) => (
            <li key={indexCol} id={`${indexCol}, ${indexRow}`} className="space" style={chooseStyle([indexCol, indexRow])} onClick={(e)=> handleClick(e, indexRow, indexCol)}>{`${gridStatus[indexRow][indexCol]}`}</li>
          ))}
        </ul>
      ))}

    </main>
  );
};


// else if (tile.from == "board") {
//   //set space content to the tile's letter
//  space.textContent = newSelectedTile.letter ? newSelectedTile.letter : " "
//  //set the fill grid to the tile's letter
//  fill[tile.row][tile.col] = newSelectedTile.letter ? newSelectedTile.letter : " "
// }