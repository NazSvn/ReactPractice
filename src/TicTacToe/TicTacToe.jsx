import { useEffect, useState } from 'react';
import './tictactoe.css';
import PropTypes from 'prop-types';

const WINNING_PATTERN = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const Square = ({ value, onClick, isWinner }) => {
  console.log(isWinner);
  return (
    <button
      onClick={onClick}
      className={`square ${isWinner ? 'winning' : ''} ${value ? 'filled' : ''}`}
      disabled={value !== ''}
    >
      {value}
    </button>
  );
};

const TicTacToe = () => {
  const [isXTurn, setIsXTurn] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(''));
  const [status, setStatus] = useState('');
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState(null);

  const handleWinner = (squares) => {
    for (let i = 0; i < WINNING_PATTERN.length; i++) {
      const [x, y, z] = WINNING_PATTERN[i];

      if (
        squares[x] &&
        squares[x] === squares[y] &&
        squares[x] === squares[z]
      ) {
        setWinningLine([x, y, z]);
        return squares[x];
      }
    }
    return null;
  };

  const handleClick = (currentSquare) => {
    const cpySquares = [...squares];

    if (cpySquares[currentSquare] || winner) return;

    cpySquares[currentSquare] = isXTurn ? 'X' : 'O';
    setSquares(cpySquares);
    setIsXTurn(!isXTurn);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(''));
    setIsXTurn(true);
    setWinner(null);
    setWinningLine(null);
  };

  useEffect(() => {
    if (!handleWinner(squares) && squares.every((item) => item !== '')) {
      setStatus("It's a Draw!");
    } else if (handleWinner(squares)) {
      setStatus(`Player ${winner} Wins!`);
      setWinner(`${handleWinner(squares)}`);
    } else {
      setStatus(`It's Player ${isXTurn ? 'X' : 'O'} turn`);
    }
  }, [squares, isXTurn, winner]);

  const renderSquare = (i) => (
    <Square
      key={i}
      value={squares[i]}
      onClick={() => handleClick(i)}
      isWinner={winningLine?.includes(i)}
    />
  );

  return (
    <>
      <div className='wrapper'>
        <div className='game-container'>
          <h1 className='game-title'>Tic Tac Toe</h1>

          <div className='status-panel'>
            <span
              className={`game-status ${winner ? 'winner' : ''} ${
                status.includes('Draw') ? 'draw' : ''
              }`}
            >
              {status}
            </span>
          </div>

          <div className='board'>
            {Array(9)
              .fill(null)
              .map((_, i) => renderSquare(i))}
          </div>

          <button
            className='reset-button'
            onClick={handleReset}
            type='button'
          >
            New Game
          </button>
        </div>
      </div>
    </>
  );
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  isWinner: PropTypes.bool.isRequired,
};

Square.defaultProps = {
  isWinner: false,
};

export default TicTacToe;
