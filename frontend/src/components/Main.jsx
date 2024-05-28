import {useEffect, useState} from 'react'
import {Box, CircularProgress, Grid} from '@mui/material'
import Content from './Content'
import LoginRegisterForm from './LoginRegisterForm'
import AuthService from '../utils/auth'
import {useAlert} from './Alert'

const authService = new AuthService()

function Main() {
  const doAlert = useAlert()

  const [authed, setAuthed] = useState(false)
  const [loading, setLoading] = useState(true)


  const handleLogin = (user, pass) => {
    authService.login(user, pass)
      .then(resp => {
        doAlert(resp.data.message, resp.data.status)
        setAuthed(true)
      })
      .catch(err => doAlert(err.data.message, err.data.status))
  }
  const handleRegister = (user, pass, callback) => {
    authService.register(user, pass)
      .then(resp => {
        doAlert(resp.data.message, resp.data.status)
        callback()
      })
      .catch(err => doAlert(err.data.message, err.data.status))
  }
  const handleLogout = () => {
    setAuthed(false)
    authService.logout()
  }

  // check if existing token is valid
  useEffect(() => {
    authService.check()
      .then(() => {
        setLoading(false)
        setAuthed(true)
      })
      .catch(() => {
        setLoading(false)
        setAuthed(false)
      })
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
            <LoginRegisterForm doLogin={handleLogin} doRegister={handleRegister} />
          </Grid>
      }
    </>
  )
}

export default Main
