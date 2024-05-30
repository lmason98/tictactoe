import {useState} from 'react'
import {AppBar, Box, Button, Grid, Toolbar, Typography} from '@mui/material'
import {Logout, Add, Person, FormatListNumbered} from '@mui/icons-material'
import TicTacToe from './TicTacToe'
import {getUserName} from '../utils/auth'

const GAME_SIZE = 3

function Content({handleLogout}) {

  const [gameRunning, setGameRunning] = useState(false)

  const handleGameStart = () => setGameRunning(true)
  const handleGameEnd = () => setGameRunning(false)

  return (
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
            <Button startIcon={<Add />} variant='contained' onClick={handleGameStart} disabled={gameRunning}>New Game</Button>
          </Grid>
          <Grid item>
            <Button startIcon={<Person />} variant='contained'>Your Stats</Button>
          </Grid>
          <Grid item>
            <Button startIcon={<FormatListNumbered />} variant='contained'>High Scores</Button>
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
  )
}

export default Content
