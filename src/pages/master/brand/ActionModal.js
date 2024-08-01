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
import { getBrand } from 'src/network/actions/getBrand'
import { addBrand } from 'src/network/actions/addBrand'
import { deleteBrand } from 'src/network/actions/deleteBrand'

const ActionModal = ({ open, handleClose, type, clickedData }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ name: '' })

  useEffect(() => {
    setData({ name: clickedData?.Brand_Name })
  }, [clickedData])

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  console.log('clickedData', clickedData, type)

  const handleSubmit = () => {
    const extra = () => {
      handleClose()
      setData({ name: '' })
      dispatch(getBrand())
    }

    const body = {
      Brand_Name: data?.name || '',
      updated_by: updated_by
    }
    if (type == 'Update' || type == 'Delete') {
      body['brand_id'] = clickedData?.id || 0
    }

    if (type == 'Add') {
      dispatch(addBrand('add-brand', body, extra))
    } else if (type == 'Update') {
      dispatch(addBrand('update-brand', body, extra))
    } else if (type == 'Delete') {
      dispatch(deleteBrand('delete-brand', body, extra))
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
            {type} Brand
          </Typography>
        </DialogTitle>
        <DialogContent>
          {type == 'Delete' ? (
            <Typography>Are you sure you want to delete this brand?</Typography>
          ) : (
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Brand Name'
                  disabled={type == 'View' ? true : false}
                  value={data?.name}
                  name='name'
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
              setData({ name: '' })
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
