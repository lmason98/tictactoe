import {useEffect, useState} from 'react'
import {Card, Grid, Typography} from '@mui/material'
import Cell from './Cell'
import {PLAYER_O, PLAYER_X} from '../utils/tictactoeLogic'

const BORDER = '2px solid #1976d2'

const getWindowSize = () => {
  const {innerWidth, innerHeight} = window
  return {w: innerWidth, h: innerHeight}
}

function TicTacToe({size}) {

  const [cellSize, setCellSize] = useState('200px')
  const [gameState, setGameState] = useState(Array(size).fill(null).map(() =>
    new Array(size).fill(null))) // Game state as 2d array, inited to null
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X)

  // Calc cell size based on window size and board size prop
  const calcCellSize = (windowSize) => {
    const min = Math.min(windowSize.w - 30, windowSize.h - 200)

    setCellSize(`${Math.floor(min / size)}px`)
  }

  // Set tic-tac-toe borders
  const getBorder = (i, j) => {
    let border = {}
    if (i < size - 1)
      border['borderBottom'] = BORDER

    if (j < size - 1)
      border['borderRight'] = BORDER

    return border
  }

  // Cell on click, fill cell and swap player turn
  const handleCellClick = (pos) => {
    let newGameState = gameState
    newGameState[pos.row][pos.col] = playerTurn
    setGameState(newGameState)

    setPlayerTurn(playerTurn === PLAYER_X ? PLAYER_O : PLAYER_X)
  }

  useEffect(() => {
    calcCellSize(getWindowSize())
    const windowResize = () => calcCellSize(getWindowSize())

    window.addEventListener('resize', windowResize)
    return () => window.removeEventListener('resize', windowResize)
  }, [])

  return (
    <>
      <Grid item xs={12}>
        <Typography variant={'h6'} sx={{textAlign: 'center'}}>Player {playerTurn}'s turn</Typography>
      </Grid>
      <Grid
        item
        container
        sx={{maxWidth: `calc(${cellSize} * ${size})`, maxHeight: `calc(${cellSize} * ${size})`, margin: '15px 0 15px 0'}}
        component={Card}
      >
        {Array.from(Array(size), (_, i) => (
          <Grid
            key={i}
            item
            container
            direction='row'
            justifyContent='center'
            sx={{height: cellSize}}
          >
            {Array.from(Array(size), (_, j) => (
              <Cell
                key={`_${j}`}
                value={gameState[i][j] || null}
                position={{row: i, col: j}}
                size={cellSize}
                border={getBorder(i, j)}
                onClick={handleCellClick}
              />
            ))}
          </Grid>
        ))}
      </Grid>
    </>
  )
}

export default TicTacToe