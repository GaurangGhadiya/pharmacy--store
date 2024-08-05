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
import { addPharmaGroup } from 'src/network/actions/addPharmaGroup'
import { getPharmaGroup } from 'src/network/actions/getPharmaGroup'
import { deletePharmaGroup } from 'src/network/actions/deletePharmaGroup'
import { getTax } from 'src/network/actions/getTax'
import { addTax } from 'src/network/actions/addTax'
import { deleteTax } from 'src/network/actions/deleteTax'

const ActionModal = ({ open, handleClose, type, clickedData }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ Tax_Name: '', Tax_Rt: '' })

  useEffect(() => {
    setData({ Tax_Name: clickedData?.Tax_Name, Tax_Rt: clickedData?.Tax_Rt })
  }, [clickedData])

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  console.log('clickedData', clickedData, type)

  const handleSubmit = () => {
    const extra = () => {
      handleClose()
      setData({ Tax_Name: '', Tax_Rt: '' })
      dispatch(getTax())
    }

    const body = {
      Tax_Name: data?.Tax_Name || '',
      Tax_Rt: data?.Tax_Rt || '',
      updated_by: updated_by
    }
    if (type == 'Update' || type == 'Delete') {
      body['tax_id'] = clickedData?.id || 0
    }

    if (type == 'Add') {
      dispatch(addTax('add-TaxType', body, extra))
    } else if (type == 'Update') {
      dispatch(addTax('update-TaxType', body, extra))
    } else if (type == 'Delete') {
      dispatch(deleteTax('delete-TaxType', body, extra))
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
            {type} Tax
          </Typography>
        </DialogTitle>
        <DialogContent>
          {type == 'Delete' ? (
            <Typography>Are you sure you want to delete this Tax?</Typography>
          ) : (
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Tax Name'
                  disabled={type == 'View' ? true : false}
                  value={data?.Tax_Name}
                  name='Tax_Name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Tax Rate'
                  disabled={type == 'View' ? true : false}
                  value={data?.Tax_Rt}
                  name='Tax_Rt'
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
              setData({ Tax_Name: '', Tax_Rt: '' })
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
