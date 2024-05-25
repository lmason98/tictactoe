import {Grid} from '@mui/material'
import '../css/Cell.css'

function Cell({value, position, size, border, onClick}) {

  const handleClick = () => onClick(position)

  return (
    <Grid
      item
      container
      justifyContent='center'
      alignItems='center'
      className={value ? 'cell-filled' : 'cell'}
      sx={{...border, maxWidth: size, maxHeight: size, fontSize: 30, fontWeight: 'bold', color: '#1976d2'}}
      onClick={handleClick}
    >
      {value}
    </Grid>
  )
}

export default Cell