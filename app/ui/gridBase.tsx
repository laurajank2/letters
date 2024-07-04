import React, { useEffect, useState } from "react";
import "./styles.css";
import Grid from "./grid";

export default function GridBase() {
    type GridBase = {
        cells: Number,
        rows: Number
    };
  const gridBase : GridBase = {
    cells: 9,
    rows: 9
  };



  return (
    <div className="app">
      <Grid
        grid={gridBase}
      />
    </div>
  );
}
