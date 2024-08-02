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
import { getUnit } from 'src/network/actions/getUnit'
import { addUnit } from 'src/network/actions/addUnit'
import { deleteUnit } from 'src/network/actions/deleteUnit'

const ActionModal = ({ open, handleClose, type, clickedData }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ Unit_Name: '' })

  useEffect(() => {
    setData({ Unit_Name: clickedData?.Unit_Name })
  }, [clickedData])

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  console.log('clickedData', clickedData, type)

  const handleSubmit = () => {
    const extra = () => {
      handleClose()
      setData({ Unit_Name: '' })
      dispatch(getUnit())
    }

    const body = {
      Unit_Name: data?.Unit_Name || '',
      updated_by: updated_by
    }
    if (type == 'Update' || type == 'Delete') {
      body['unit_id'] = clickedData?.id || 0
    }

    if (type == 'Add') {
      dispatch(addUnit('add-unit', body, extra))
    } else if (type == 'Update') {
      dispatch(addUnit('update-unit', body, extra))
    } else if (type == 'Delete') {
      dispatch(deleteUnit('delete-unit', body, extra))
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
            {type} Unit
          </Typography>
        </DialogTitle>
        <DialogContent>
          {type == 'Delete' ? (
            <Typography>Are you sure you want to delete this unit?</Typography>
          ) : (
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Unit Name'
                  disabled={type == 'View' ? true : false}
                  value={data?.Unit_Name}
                  name='Unit_Name'
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
              setData({ Unit_Name: '' })
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
