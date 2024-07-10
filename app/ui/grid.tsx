'use client';

import React, { useEffect, useState } from 'react';
import CSS from "csstype";
import { GridBase, JSONValue, letterPointsDictionary, Tile } from '../lib/definitions';
import { useContext } from 'react';
import { useGridFillContext, useRackContext, useSelectedTileContext, removeFromRack, useAdvertContext, letterPointsContext, powerDictionaryContext, usePointContext } from '../lib/LevelContext';
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

  const {point, setPoint} = usePointContext();

  const letterPoints = useContext(letterPointsContext);

  const powerPlacements = useContext(powerDictionaryContext);

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
    let toCheck: Array<string> = [];
    let toScore: Array<number> = [];
    let colWord = "";
    let rowWord = "";
    let colLetterPower = 0;
    let rowLetterPower = 0;
    let colWordPower = 0;
    let rowWordPower = 0;
    let singleLetterWord = false;
    for (let i = 0; i < fill.length; i++) {
      for (let j = 0; j < fill.length; j++) {
        //check column word
        //at end of word, so time to add word to array
        if(colWord != "" && (fill[i][j] == " " || j==8)) {
          if (fill[i][j] != " ") {
            let power = checkPowerType([i,j]);
            if (power != "none") {
              console.log("power: " + power + " for " + fill[i][j])
              if (power == "double letter") {
                colLetterPower += letterPoints[fill[i][j] as keyof letterPointsDictionary]
              } else if (power == "triple letter") {
                colLetterPower += letterPoints[fill[i][j] as keyof letterPointsDictionary]*2
              } else if (power == "double word") {
                colWordPower += 2
              } else if (power == "triple word") {
                colWordPower += 3
              }
            }
            colWord = colWord + fill[i][j];
          }
          if ((!singleLetterWord && rack.length == 8) || colWord.length > 1) {
            if (colWord.length == 1) {
              singleLetterWord = true
            }
            toScore.push((pointCount(colWord)+colLetterPower)*(colWordPower? colWordPower: 1))
            toCheck.push(colWord)
            
          }
          colLetterPower = 0;
          colWordPower = 0;
          colWord = ""
        } else if (fill[i][j] != " ") {
          let power = checkPowerType([i,j]);
            if (power != "none") {
              console.log("power: " + power + " for " + fill[i][j])
              if (power == "double letter") {
                colLetterPower += letterPoints[fill[i][j] as keyof letterPointsDictionary]
              } else if (power == "triple letter") {
                colLetterPower += letterPoints[fill[i][j] as keyof letterPointsDictionary]*2
              } else if (power == "double word") {
                colWordPower += 2
              } else if (power == "triple word") {
                colWordPower += 3
              }
            }
          colWord = colWord + fill[i][j];
        }

        //check row word
        if(rowWord != "" && (fill[j][i] == " " || i==8)) {
          if (fill[j][i] != " ") {
            let power = checkPowerType([j,i]);
            if (power != "none") {
              console.log("power: " + power + " for " + fill[j][i])
              if (power == "double letter") {
                rowLetterPower += letterPoints[fill[j][i] as keyof letterPointsDictionary]
              } else if (power == "triple letter") {
                rowLetterPower += letterPoints[fill[j][i] as keyof letterPointsDictionary]*2
              } else if (power == "double word") {
                rowWordPower += 2
              } else if (power == "triple word") {
                rowWordPower += 3
              }
            }
            rowWord = rowWord + fill[j][i];
          }
          if ((!singleLetterWord && rack.length == 8) || rowWord.length > 1) {
            if (rowWord.length == 1) {
              singleLetterWord = true
            }
            toScore.push((pointCount(rowWord)+rowLetterPower)*(rowWordPower? rowWordPower: 1))
            toCheck.push(rowWord)
            
          }
          rowLetterPower = 0;
          rowWordPower = 0;
          rowWord = ""
        } else if (fill[j][i] != " ") {
          if (fill[j][i]=="F") {
            console.log("coordinates of f: " + [j,i])
          }
          let power = checkPowerType([j,i]);
          if (power != "none") {
            console.log("power: " + power + " for " + fill[j][i])
            if (power == "double letter") {
              rowLetterPower += letterPoints[fill[j][i] as keyof letterPointsDictionary]
            } else if (power == "triple letter") {
              rowLetterPower += letterPoints[fill[j][i] as keyof letterPointsDictionary]*2
            } else if (power == "double word") {
              rowWordPower += 2
            } else if (power == "triple word") {
              rowWordPower += 3
            }
          }
          rowWord = rowWord + fill[j][i];
        }
      }
    }

    

    console.log("words to check: " + toCheck);
    for (let i = 0; i < toCheck.length; i++) {
      let word: string = toCheck[i]
      const wordInfo = await getWordInfo(word);
      if (wordInfo == "error") {
        return false;
      }
    };

    console.log("toScore: " + toScore)
    let pointTotal = 0;
    for (let i = 0; i < toScore.length; i++) {
      pointTotal += toScore[i]
    }
    setPoint(pointTotal);
    return true
  }

  const checkPowerType = (position: Array<number>) => {
    if (checkArrayInArray(powerPlacements.doubleLetter, position)) {
      return "double letter"
    } else if (checkArrayInArray(powerPlacements.tripleLetter, position)) {
      return "triple letter"
    } else if (checkArrayInArray(powerPlacements.doubleWord, position)) {
      return "double word"
    } else if (checkArrayInArray(powerPlacements.tripleWord, position)) {
      return "triple word"
    }
    return "none"
  }

  const checkArrayInArray = (arr1: Array<Array<number>>, arr2: Array<number>) => {
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i].join() == arr2.join()) {
        return true
      }
    }
    return false
  }

  const pointCount = (word: string) => {
    let points = 0
    for (let i = 0; i < word.length; i++) {
      points += letterPoints[word[i] as keyof letterPointsDictionary]
    }
    return points
  }


  const checkBoardValidity = () => {
    if (rack.length == 9  || fill[4][4] == " ") {
      const newAdvert = "Place tile in the center of the board"
      setAdvert(newAdvert);
      return false
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

  const countPoints = () => {

  }

  const putTileOnBoardFromRack = async (space:  HTMLLIElement, row: number, col: number) => {

    let newLetter: string = " ";
    if (space.getElementsByClassName("space-letter")[0] != undefined) {
      newLetter = space.getElementsByClassName("space-letter")[0].textContent!;
    }
    var newSelectedTile: Tile = {
      letter: newLetter,
      row: row,
      col: col,
      html: space,
      from: (newLetter == " ") ? "start" : "board"
    }
    //set space content to the tile's letter
    space.getElementsByClassName("space-letter")[0].textContent = tile.letter ? tile.letter : " ";
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

    let newLetter: string = " ";
    if (space.getElementsByClassName("space-letter")[0] != undefined) {
      newLetter = space.getElementsByClassName("space-letter")[0].textContent!;
    }

    var newSelectedTile: Tile = {
      letter: newLetter,
      row: row,
      col: col,
      html: space,
      from: (newLetter == " ") ? "start" : "board"
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
    
    let newLetter: string = " ";
    if (space.getElementsByClassName("space-letter")[0] != undefined) {
      newLetter = space.getElementsByClassName("space-letter")[0].textContent!;
    }
    

    var newSelectedTile: Tile = {
      letter: newLetter,
      row: row,
      col: col,
      html: space,
      from: (newLetter == " ") ? "start" : "board"
    }

    tile.html?.classList.remove('selected');

    //set space content to the tile's letter
    space.getElementsByClassName("space-letter")[0].textContent = tile.letter ? tile.letter : " "
    //set the fill grid to the tile's letter
    fill[row][col] = tile.letter ? tile.letter : " "



    tile.html.getElementsByClassName("space-letter")[0].textContent = newSelectedTile.letter ? newSelectedTile.letter : " "

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

  const handleClick = (e:  React.MouseEvent<HTMLElement>, row: number, col: number) => {

    const target = getRealSpace(e)
    const space : HTMLLIElement = (target as HTMLLIElement);


    if (tile.from == "rack") {
      putTileOnBoardFromRack(space, row, col);
    } else if (tile.from == "start") {
      takeTileFromBoard(space,row,col);
    } else if (tile.from == "board") {
      boardToBoard(space, row, col);
    }
    
  };

  const checkGridStatus = (status: string) => {
    if(status == " ") {
      return " "
    } else {
      return letterPoints[status as keyof letterPointsDictionary]
    }
  }

  const getRealSpace = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    let target = (e.target as HTMLElement)

    if (target.className == "space-score"  || target.className == "space-letter") {
        target = target.parentNode ? (target.parentNode as HTMLLIElement) : target
    }

    return target
  }

  //always check words when grid renders
  checkWords();

  return (
    <main>

      {rows.map((row, indexRow) => (
        
        <ul className="row" key={indexRow}>
          {cells.map((cell, indexCol) => (
            <li key={indexCol} id={`${indexCol}, ${indexRow}`} className="space" style={chooseStyle([indexCol, indexRow])} onClick={(e)=> handleClick(e, indexRow, indexCol)}>
              <p className='space-letter'>{`${gridStatus[indexRow][indexCol]}`}</p>
              <p className='space-score'>{`${checkGridStatus(gridStatus[indexRow][indexCol])}`}</p>
                
            </li>
          ))}
        </ul>
      ))}

    </main>
  );
};
