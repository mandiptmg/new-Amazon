'use client'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import { useGlobalContext } from '@/context/Context'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

export default function BasicModal() {
  const { showModel, setShowModel } = useGlobalContext()
  const handleOpen = () => setShowModel(true)
  const handleClose = () => setShowModel(false)

  return (
    <div>
      <Modal
        open={showModel}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <Typography id='modal-modal-title' variant='h6' component='h2'>
            Text in a modal
          </Typography>
          <Typography id='modal-modal-description' sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}
