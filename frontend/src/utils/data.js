import api from "./api";


const getPersonalStatsData = (callback) => {
  api.get('/stats/')
    .then(resp => {
      callback(resp.data)
    })
    .catch(err => {
      console.log('getPersonalStatsData err :', err)
    })
}

export {
  getPersonalStatsData
}
