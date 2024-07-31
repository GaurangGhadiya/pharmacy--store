import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Grid } from '@mui/material'

const ActionModal = ({ open, handleClose, type }) => {
  return (
    <>
      <Dialog
        onClose={handleClose}
        aria-labelledby='customized-dialog-title'
        open={open}
        PaperProps={{ sx: { overflow: 'visible' } }}
        maxWidth={'sm'}
        fullWidth={true}
      >
        <DialogTitle id='customized-dialog-title'>
          <Typography variant='h5' component='span'>
            {type} Menufacturer
          </Typography>
        </DialogTitle>
        <DialogContent>
          {type == 'Delete' ? (
            <Typography>Are you sure you want to delete this menufacturer?</Typography>
          ) : (
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <CustomTextField fullWidth label='Menufacturer Name' disabled={type == 'View' ? true : false} />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  rows={3}
                  multiline
                  label='Address'
                  disabled={type == 'View' ? true : false}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField fullWidth label='Contact No.' type='number' disabled={type == 'View' ? true : false} />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='contained' color='error'>
            {type == 'View' ? 'Close' : 'Cancel'}
          </Button>
          {type != 'View' && (
            <Button onClick={handleClose} variant='contained'>
              {type == 'Delete' ? 'Delete' : 'Submit'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ActionModal
