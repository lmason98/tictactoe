import api from './api'

const PLAYER_X = 'X'
const PLAYER_O = 'O'

const doAITurn = (data, callback) => {
  api.post('/ai/', data)
    .then(resp => {
      callback(resp)
    })
    .catch(err => {
      console.log('do turn err :', err)
    })
}

export {
  doAITurn, PLAYER_X, PLAYER_O
}
