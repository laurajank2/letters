'use client';

import React, { useEffect, useState } from 'react';
import CSS from "csstype";
import { GridBase, JSONValue, Tile } from '../lib/definitions';
import { useContext } from 'react';
import { useGridFillContext, useRackContext, useSelectedTileContext, removeFromRack, useAdvertContext } from '../lib/LevelContext';
import axios from 'axios';

export default function Grid ({grid}:{grid:GridBase})  {
  const cells = new Array(grid.cells).fill(0);
  const rows = new Array(grid.rows).fill(0);

  const {rack, setRack} = useRackContext();
  const { fill, setFill } = useGridFillContext();
  const gridStatus:Array<Array<string>> = fill;

  const {advert, setAdvert} = useAdvertContext();

  const dummyJson: JSONValue = null;
  const [json, setJson] = useState(dummyJson)

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

  const getWordInfo = async (word: string): Promise<JSONValue> => {
    try {
      const { data } = await axios.get<JSONValue>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      return data
    } catch (error) {
      return "error"
    }
  }

  const checkWordValidity = async () => {
    console.log("fill: " + fill)
    let toCheck: Array<string> = [];
    let colWord = "";
    let rowWord = "";
    for (let i = 0; i < fill.length; i++) {
      for (let j = 0; j < fill.length; j++) {
        //check column word
        if(colWord != "" && (fill[i][j] == " " || j==8)) {
          if (fill[i][j] != " ") {
            colWord = colWord + fill[i][j];
          }
          if (colWord.length > 1 || rack.length == 8) {
            toCheck.push(colWord)
          }
          
          colWord = ""
        } else if (fill[i][j] != " ") {
          colWord = colWord + fill[i][j];
        }

        //check row word
        if(rowWord != "" && (fill[j][i] == " " || i==8)) {
          if (fill[j][i] != " ") {
            rowWord = rowWord + fill[j][i];
          }
          if (rowWord.length > 1 || rack.length == 8) {
            toCheck.push(rowWord)
          }
          rowWord = ""
        } else if (fill[j][i] != " ") {
          rowWord = rowWord + fill[j][i];
        }
      }
    }

    console.log("words to check: " + toCheck);
    for (let i = 0; i < toCheck.length; i++) {
      let word: string = toCheck[i]
      console.log(" word is: " + word)
      const wordInfo = await getWordInfo(word);
      if (wordInfo == "error") {
        console.log("was an error: " + wordInfo)
        return false;
      }
    };
    console.log("all words work")
    return true
  }


  const checkBoardValidity = () => {
    if (rack.length == 9 ) {
      const newAdvert = "Place tile in the center of the board"
      setAdvert(newAdvert);
    }
    for(let i = 0; i < fill.length; i ++) {
      for (let j = 0; j < fill[i].length; j ++) {
        if (fill[i][j] != " ") {
          if ((fill[i+1] === undefined || fill[i+1][j] == " ") && (fill[i-1] === undefined || fill[i-1][j] == " ") && (fill[i][j+1] === undefined|| fill[i][j+1] == " ") && (fill[i][j-1] === undefined || fill[i][j-1] == " ")) {
            const newAdvert = "Place tile next to one on the board"
            setAdvert(newAdvert);
            return false;
          }
        }
      }
    }
    const newAdvert = "Make words!"
    setAdvert(newAdvert);
    return true;
  }

  const putTileOnBoardFromRack = async (space:  HTMLLIElement, row: number, col: number) => {


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

    //give old tile back to rack if necessary
    if (newSelectedTile.from == "board" && newSelectedTile.letter != null) {
      rack.push(newSelectedTile.letter);
      let newRack = rack;
      setRack(newRack);
    }
    
    //remove the tile from rack
    if (tile.from == "rack") {
      if (tile.html?.classList.contains('selected')) {
        tile.html?.classList.remove('selected');
        const newRack = removeFromRack(tile.letter? tile.letter: "", rack);
        setRack(newRack);
      }
    }
    
    setTile(newSelectedTile);

    const validWords: boolean = await checkWordValidity()
    if (!validWords) {
      const newAdvert = "Something on your board isn't a word. Keep trying!"
      setAdvert(newAdvert);
    } else {
      checkBoardValidity();
    }

  }

  const takeTileFromBoard = async (space:  HTMLLIElement, row: number, col: number) => {
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

    const validWords: boolean = await checkWordValidity()
    if (!validWords) {
      const newAdvert = "Something on your board isn't a word. Keep trying!"
      setAdvert(newAdvert);
    } else {
      checkBoardValidity();
    }
    
  }

  const boardToBoard =  async (space:  HTMLLIElement, row: number, col: number) => {
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

    const validWords: boolean = await checkWordValidity()
    if (!validWords) {
      const newAdvert = "Something on your board isn't a word. Keep trying!"
      setAdvert(newAdvert);
    } else {
      checkBoardValidity();
    }
  }

  const checkWords = async () => {
    const validWords: boolean = await checkWordValidity()
    if (!validWords) {
      const newAdvert = "Something on your board isn't a word. Keep trying!"
      setAdvert(newAdvert);
    } else {
      checkBoardValidity();
    }
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

  //always check words when grid renders
  checkWords();

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



function setState(arg0: null): { json: any; setJson: any; } {
  throw new Error('Function not implemented.');
}
// else if (tile.from == "board") {
//   //set space content to the tile's letter
//  space.textContent = newSelectedTile.letter ? newSelectedTile.letter : " "
//  //set the fill grid to the tile's letter
//  fill[tile.row][tile.col] = newSelectedTile.letter ? newSelectedTile.letter : " "
// }