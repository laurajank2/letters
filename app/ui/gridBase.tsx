'use client';

import React, { useEffect, useState } from "react";
import "./styles.css";
import Grid from "./grid";

export default function GridBase() {
  type GridBase = {
      cells: number,
      rows: number
  };
  const gridBase : GridBase = {
    cells: 9,
    rows: 9
  };



  return (
    <div className="grid-base">
      <Grid
        grid={gridBase}
      />
    </div>
  );
}
