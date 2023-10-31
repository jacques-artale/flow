import get_style from '../../style/style';

function InfoBar({ solve_time }) {

  function get_time_string() {
    const minutes = Math.floor(solve_time / 60);
    const seconds = solve_time % 60;
    return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
  }

  const style = get_style();

  return (
    <div style={style.info_bar}>
      <p style={{margin: '2%'}}>Time: {get_time_string()}</p>
      <p style={{margin: '2%'}}>Moves: 0</p>
    </div>
  );
}

export default InfoBar;