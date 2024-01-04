import React, { useEffect, useRef } from 'react';
import '../App.css';
import get_style from "../style/style";

function get_solved_time_string(solve_time) {
  const hours = Math.floor(solve_time / 3600);
  const minutes = Math.floor((solve_time % 3600) / 60);
  const seconds = Math.floor(solve_time % 60);

  let time_string = '';
  if (hours > 0) time_string += `${hours}h `;
  if (minutes > 0) time_string += `${minutes}m `;
  time_string += `${seconds}s`;

  return time_string;
}

function SolvedPopup({ solved, solve_time }) {
  const style = get_style();

  return (
    <div style={{...style.solved_overlay, display: solved ? 'flex' : 'none'}}>
      <h2>Puzzle Solved</h2>
      <p>Time taken: {get_solved_time_string(solve_time)}</p>
    </div>
  );
}

export default SolvedPopup;