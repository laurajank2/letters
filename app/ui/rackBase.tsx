'use client';

import React, { useEffect, useState } from "react";
import "./styles.css";
import Rack from "./rack";
import { useContext } from "react";
import { useGlobalContext } from "../lib/LevelContext";

export default function RackBase() {
  type GridBase = {
      cells: number,
      rows: number
  };
  const rackBase : GridBase = {
    cells: 9,
    rows: 1
  };

  const { copy, setCopy } = useGlobalContext()


  return (
    <div className="rack-base">
      <Rack
        grid={rackBase}
      />
    </div>
  );
}
