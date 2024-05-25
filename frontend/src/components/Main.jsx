import {useEffect, useState} from 'react'
import {Box, Button, CircularProgress, Grid} from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import Content from "./Content";


function Main() {
  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)

  const handleLogin = () => setAuthed(true)
  const handleLogout = () => setAuthed(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }, [])

  return (
    <>
      {loading ?
        <Box sx={{display: 'flex', textAlign: 'center', height: '100vh'}}>
          <CircularProgress sx={{margin: 'auto auto'}} />
        </Box>
      :
        authed ?
          <Content handleLogout={handleLogout} />
        :
          <Grid
            container
            spacing={0}
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{display: 'flex', height: '100vh', backgroundColor: '#eaeaea'}}
          >
            <Grid item>
              <Button startIcon={<LoginIcon/>} variant='contained' size='large' onClick={handleLogin}>Login</Button>
            </Grid>
          </Grid>
      }
    </>
  )
}

export default Main
