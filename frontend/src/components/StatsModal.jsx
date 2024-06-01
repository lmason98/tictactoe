import {useEffect, useState} from 'react'
import {
  Box,
  Button, CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle, Paper,
  Table, TableBody, TableCell,
  TableContainer,
  TableHead, TableRow
} from '@mui/material'
import {getPersonalStatsData} from '../utils/data'
import '../css/Table.css'


function StatsModal({open, onClose}) {

  const [objects, setObjects] = useState(null)

  useEffect(() => {
    if (open)
      getPersonalStatsData(data => setObjects(data.objects))

    return () => {
      setObjects(null)
    }
  }, [open])

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='md'>
      <DialogTitle>Statistics</DialogTitle>
      <DialogContent>
        {objects === null ?
          <Box sx={{textAlign: 'center', mt: 5}}>
            <CircularProgress />
          </Box>
          :
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Player</TableCell>
                  <TableCell>Games Played</TableCell>
                  <TableCell>Games Won</TableCell>
                  <TableCell>Games Lost</TableCell>
                  <TableCell>Games Tied</TableCell>
                  <TableCell>Win Percentage</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {objects.map((object, key) => (
                  <TableRow key={key}>
                    <TableCell>{object.player}</TableCell>
                    <TableCell>{object.gamesPlayed}</TableCell>
                    <TableCell>{object.gamesWon}</TableCell>
                    <TableCell>{object.gamesLost}</TableCell>
                    <TableCell>{object.gamesTied}</TableCell>
                    <TableCell>{object.winPercent}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        }
      </DialogContent>
      <DialogActions>
        <Button variant='contained' onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default StatsModal
