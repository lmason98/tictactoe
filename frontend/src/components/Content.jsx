import {useState} from 'react'
import {AppBar, Box, Button, Grid, Toolbar, Typography} from '@mui/material'
import {Logout, Add, FormatListNumbered} from '@mui/icons-material'
import TicTacToe from './TicTacToe'
import {getUserName} from '../utils/auth'
import StatsModal from "./StatsModal";

const GAME_SIZE = 3
const RESET_TIME = 5000

function Content({handleLogout}) {

  const [gameRunning, setGameRunning] = useState(false)
  const [statsModalOpen, setStatsModalOpen] = useState(false)
  const [newGameButtonText, setNewGameButtonText] = useState('New Game')

  const handleGameStart = () => {
    setGameRunning(true)
    setNewGameButtonText('Playing...')
  }
  const handleGameEnd = () => {
    // New game button countdown
    let countdown = RESET_TIME / 1000
    setNewGameButtonText(`${countdown}...`)
    let intervalId = setInterval(() => {
      countdown--
      setNewGameButtonText(`${countdown}...`)
    }, 1000)
    setTimeout(() => {
      clearInterval(intervalId)
      setNewGameButtonText('New Game')
      setGameRunning(false)
    }, RESET_TIME)
  }
  const handleStatsModalOpen = () => setStatsModalOpen(true)
  const handleStatsModalClose = () => setStatsModalOpen(false)

  return (
    <>
      <Box sx={{display: 'flex', backgroundColor: '#eaeaea', height: '100%'}}>
        <AppBar>
          <Toolbar variant='dense'>
            <Typography variant='h4'>Tic Tac Toe</Typography>
            <Button
              onClick={handleLogout}
              startIcon={<Logout />}
              variant='filled'
              size='large'
              sx={{maxWidth: '800px', marginLeft: 'auto'}}
            >
              Logout {getUserName()}
            </Button>
          </Toolbar>
        </AppBar>
        <Grid
          container
          spacing={0}
          direction='row'
          sx={{height: '100%', backgroundColor: '#eaeaea'}}
        >

          {/* Actions */}
          <Grid item container justifyContent='center' spacing={2} sx={{padding: '0 15px 0 15px', marginTop: '45px', maxHeight: '100px'}}>
            <Grid item>
              <Button startIcon={<Add />} variant='contained' onClick={handleGameStart} disabled={gameRunning}>{newGameButtonText}</Button>
            </Grid>
            <Grid item>
              <Button startIcon={<FormatListNumbered />} variant='contained' onClick={handleStatsModalOpen}>Statistics</Button>
            </Grid>
          </Grid>

          {/* Game */}
          <Grid item container direction='row' justifyContent='center' className='game'>
            {gameRunning ?
              <TicTacToe size={GAME_SIZE} doEndGame={handleGameEnd} />
              :
              <Typography variant='h5'>Start a new game!</Typography>
            }
          </Grid>

        </Grid>
      </Box>

      <StatsModal open={statsModalOpen} onClose={handleStatsModalClose} />
    </>
  )
}

export default Content
