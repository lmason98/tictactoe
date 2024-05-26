import {Grid} from '@mui/material'
import '../css/Cell.css'

function Cell({value, position, gameOver, size, border, onClick}) {

  const handleClick = () => onClick(position)

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      className={value || gameOver ? 'cell-filled' : 'cell'}
      sx={{...border, maxWidth: size, maxHeight: size, fontSize: 30, fontWeight: 'bold', color: '#1976d2'}}
      onClick={handleClick}
    >
      {value}
    </Grid>
  )
}

export default Cell