import React, { useEffect, useRef } from 'react';
import '../App.css';
import get_style from "../style/style";

function SolvedPopup({ solved, solve_time }) {
  const style = get_style();

  return (
    <div style={{...style.solved_overlay, display: solved ? 'flex' : 'none'}}>
      <h2>Puzzle Solved</h2>
      <p>Time: {solve_time} seconds</p>
    </div>
  );
}

export default SolvedPopup;