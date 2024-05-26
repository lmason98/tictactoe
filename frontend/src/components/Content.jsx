import {useState} from 'react'
import {AppBar, Box, Button, Grid, Toolbar, Typography} from '@mui/material'
import {Logout, Add, Replay, FormatListNumbered} from '@mui/icons-material'
import TicTacToe from "./TicTacToe";

function Content({handleLogout}) {

  const [gameRunning, setGameRunning] = useState(false)
  const [gameSize, setGameSize] = useState(3)

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
            sx={{maxWidth: '100px', marginLeft: 'auto'}}
          >
            Logout
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
            <Button startIcon={<Add />} variant='contained'>New Game</Button>
          </Grid>
          <Grid item>
            <Button startIcon={<Replay />} variant='contained'>Load Game</Button>
          </Grid>
          <Grid item>
            <Button startIcon={<FormatListNumbered />} variant='contained'>High Scores</Button>
          </Grid>
        </Grid>

        {/* Game */}
        <Grid item container direction='row' justifyContent='center' className='game'>
          <TicTacToe size={gameSize} />
        </Grid>

      </Grid>
    </Box>
  )
}

export default Content
