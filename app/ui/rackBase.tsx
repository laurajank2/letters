'use client';

import React, { useEffect, useState } from "react";
import "./styles.css";
import Rack from "./rack";
import { useContext } from "react";
import { useGlobalContext, useRackContext } from "../lib/LevelContext";
import dynamic from 'next/dynamic'
 
const NoSSRRack = dynamic(() => import('../ui/rack'), { ssr: false })

export default function RackBase() {

  const {rack, setRack} = useRackContext()

  type GridBase = {
      cells: number,
      rows: number
  };
  const rackBase : GridBase = {
    cells: rack.length,
    rows: 1
  };


  return (
    <div className="rack-base">
      <NoSSRRack
        grid={rackBase}
      />
    </div>
  );
}
