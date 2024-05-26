import {useEffect, useState} from 'react'
import {Card, Grid, Typography} from '@mui/material'
import Cell from './Cell'
import {doAITurn, PLAYER_O, PLAYER_X} from '../utils/tictactoeLogic'

const BORDER = '2px solid #1976d2'

const getWindowSize = () => {
  const {innerWidth, innerHeight} = window
  return {w: innerWidth, h: innerHeight}
}

function TicTacToe({size}) {

  const [cellSize, setCellSize] = useState('200px')
  const [gameState, setGameState] = useState(Array(size).fill(null).map(() =>
    new Array(size).fill(null))) // Game state as 2d array, inited to null
  const [player, setPlayer] = useState(PLAYER_X)
  const [playerTurn, setPlayerTurn] = useState(PLAYER_X)
  const [winner, setWinner] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [statusText, setStatusText] = useState(`Player ${playerTurn}'s turn.`)

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
    if (!gameOver) {
      let newGameState = gameState

      newGameState[pos.row][pos.col] = playerTurn
      setGameState(newGameState)
      let plyTurn = PLAYER_X === player ? PLAYER_O : PLAYER_X
      setPlayerTurn(plyTurn)
      setStatusText(`Player ${plyTurn}'s turn.`)

      doAITurn({board: newGameState}, (resp) => {
        plyTurn = PLAYER_X === player ? PLAYER_X : PLAYER_O
        setPlayerTurn(plyTurn)
        setStatusText(`Player ${plyTurn}'s turn.`)
        setGameState(resp.data.board)

        if (resp.data.gameOver) {
          if (resp.data.winner) {
            setWinner(resp.data.winner)
            setStatusText(`Player ${resp.data.winner} has won!`)
          } else
            setStatusText('Nobody won!')

          setGameOver(true)
        }
      })
    }
  }

  useEffect(() => {
    calcCellSize(getWindowSize())
    const windowResize = () => calcCellSize(getWindowSize())

    window.addEventListener('resize', windowResize)
    return () => window.removeEventListener('resize', windowResize)
  }, [gameState, playerTurn, statusText])

  return (
    <>
      <Grid item xs={12}>
        <Typography variant={'h6'} sx={{textAlign: 'center'}}>{statusText}</Typography>
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
                gameOver={gameOver}
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