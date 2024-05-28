import React, {useState} from 'react'
import {Button, Card, CardActions, CardContent, CircularProgress, Grid, TextField, Typography} from '@mui/material'
import {Password, Login, Close} from '@mui/icons-material'

function LoginRegisterForm({doLogin, doRegister}) {
  const [isRegistering, setIsRegistering] = useState(false)
  const [loading, setLoading] = useState(false)

  const [userName, setUserName] = useState('')
  const [userPass, setUserPass] = useState('')
  const [userValidPass, setUserValidPass] = useState('')

  const [userNameError, setUserNameError] = useState(false)
  const [userNameHelper, setUserNameHelper] = useState('')
  const [userPassError, setUserPassError] = useState(false)
  const [userPassHelper, setUserPassHelper] = useState('')
  const [userValidPassError, setUserValidPassError] = useState(false)
  const [userValidPassHelper, setUserValidPassHelper] = useState('')

  const handleUsername = (e) => setUserName(e.target.value)
  const handlePassword = (e) => setUserPass(e.target.value)
  const handleValidPassword = (e) => setUserValidPass(e.target.value)
  const registerToggleOn = () => {
    setUserName('')
    setUserPass('')
    setUserValidPass('')

    setIsRegistering(true)
  }
  const registerToggleOff = () => setIsRegistering(false)

  const validateUserName = () => {
    if (userName === '') {
      setUserNameError(true)
      setUserNameHelper('Enter a username.')
    } else {
      setUserNameError(false)
      setUserNameHelper('')
    }
  }

  const validateUserPass = () => {
    if (userPass === '') {
      setUserPassError(true)
      setUserPassHelper('Enter a password.')
    } else {
      setUserPassError(false)
      setUserPassHelper('')
    }
  }

  const validateUserValidPass = () => {
    if (userPass !== userValidPass) {
      setUserPassError(true)
      setUserValidPassError(true)
      setUserPassHelper('Passwords do not match.')
      setUserValidPassHelper('Passwords do not match.')
    } else {
      setUserPassError(false)
      setUserValidPassError(false)
      setUserPassHelper('')
      setUserValidPassHelper('')
    }
  }

  const handleLogin = () => {
    validateUserName()
    validateUserPass()

    if (userName !== '' && userPass !== '') {
      doLogin(userName, userPass)
    }
  }

  const handleRegister = () => {
    validateUserName()
    validateUserPass()

    if (userPass !== '')
      validateUserValidPass()

    if (userName !== '' && userPass !== '' && userPass === userValidPass) {
      setLoading(true)
      doRegister(userName, userPass, () => {
        setLoading(false)
        setIsRegistering(false)

        setUserName('')
        setUserPass('')
        setUserValidPass('')
      })
    }
  }

  return (
    <Grid item component={Card}>
      <Card sx={{padding: 2}}>
        {loading ?
          <CircularProgress sx={{margin: 'auto auto'}} />
          :
          <>
            <CardContent>
              <Grid container spacing={1} sx={{maxWidth: 600}}>
                <Grid item>
                  <Typography variant='h6'>Tic Tac Toe Login</Typography>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={userNameError}
                    helperText={userNameHelper}
                    sx={{width: '100%'}}
                    label='Username'
                    value={userName}
                    onChange={handleUsername}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={userPassError}
                    helperText={userPassHelper}
                    sx={{width: '100%'}}
                    label='Password'
                    value={userPass}
                    type='password'
                    onChange={handlePassword}
                  />
                </Grid>
                {isRegistering ?
                  <Grid item xs={12}>
                    <TextField
                      error={userValidPassError}
                      helperText={userValidPassHelper}
                      sx={{width: '100%'}}
                      label='Validate Password'
                      value={userValidPass}
                      type='password'
                      onChange={handleValidPassword}
                    />
                  </Grid>
                  :
                  <></>
                }
              </Grid>
            </CardContent>
            <CardActions>
              {/* Cancel register */}
              {isRegistering ?
                <Button
                  startIcon={<Close/>}
                  variant='contained'
                  size='large'
                  onClick={registerToggleOff}
                >
                  Cancel
                </Button>
                :
                <></>
              }

              {/* Either opens register form, or submits register form */}
              <Button
                startIcon={isRegistering ? <Login/> : <Password/>}
                variant='contained'
                size='large'
                onClick={isRegistering ? handleRegister : registerToggleOn}
                sx={isRegistering ? {marginLeft: 'auto !important'} : {}}
              >
                Register
              </Button>

              {/* Login */}
              {!isRegistering ?
                <Button
                  startIcon={<Login/>}
                  variant='contained'
                  size='large'
                  sx={{marginLeft: 'auto !important'}}
                  onClick={handleLogin}
                >
                  Login
                </Button>
                :
                <></>}
            </CardActions>
          </>
        }
      </Card>
    </Grid>
  )
}

export default LoginRegisterForm