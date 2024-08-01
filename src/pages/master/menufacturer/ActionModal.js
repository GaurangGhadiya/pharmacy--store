import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { addMenufacturer } from 'src/network/actions/addMenufacturer'
import { getMenufacturer } from 'src/network/actions/getMenufacturer'
import { updated_by } from 'src/network/apiData'
import { deleteMenufacturer } from 'src/network/actions/deleteMenufacturer'

const ActionModal = ({ open, handleClose, type, clickedData }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ name: '', number: '', address: '' })

  useEffect(() => {
    setData({ name: clickedData?.mnfctrer_name, number: clickedData?.contact_no, address: clickedData?.address })
  }, [clickedData])

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  console.log('clickedData', clickedData, type)

  const handleSubmit = () => {
    const extra = () => {
      handleClose()
      setData({ name: '', number: '', address: '' })
      dispatch(getMenufacturer())
    }

    const body = {
      mnfctrer_name: data?.name || '',
      address: data?.address || '',
      contact_no: data?.number || '',
      updated_by: updated_by
    }
    if (type == 'Update' || type == 'Delete') {
      body['manufacture_id'] = clickedData?.id || 0
    }

    if (type == 'Add') {
      dispatch(addMenufacturer('add-manufacture', body, extra))
    } else if (type == 'Update') {
      dispatch(addMenufacturer('update-manufacture', body, extra))
    } else if (type == 'Delete') {
      dispatch(deleteMenufacturer('delete-manufacture', body, extra))
    }
  }

  return (
    <>
      <Dialog
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
                <CustomTextField
                  fullWidth
                  label='Menufacturer Name'
                  disabled={type == 'View' ? true : false}
                  value={data?.name}
                  name='name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  rows={3}
                  multiline
                  label='Address'
                  disabled={type == 'View' ? true : false}
                  value={data?.address}
                  name='address'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Contact No.'
                  type='number'
                  disabled={type == 'View' ? true : false}
                  value={data?.number}
                  name='number'
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose()
              setData({ name: '', number: '', address: '' })
            }}
            variant='contained'
            color='error'
          >
            {type == 'View' ? 'Close' : 'Cancel'}
          </Button>
          {type != 'View' && (
            <Button onClick={handleSubmit} variant='contained'>
              {type == 'Delete' ? 'Delete' : 'Submit'}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ActionModal
