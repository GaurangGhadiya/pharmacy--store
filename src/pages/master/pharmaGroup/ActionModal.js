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

const ActionModal = ({ open, handleClose, type, clickedData }) => {
  const dispatch = useDispatch()
  const [data, setData] = useState({ Grp_Name: '', code: '' })

  useEffect(() => {
    setData({ Grp_Name: clickedData?.Grp_Name, code: clickedData?.code })
  }, [clickedData])

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  console.log('clickedData', clickedData, type)

  const handleSubmit = () => {
    const extra = () => {
      handleClose()
      setData({ Grp_Name: '', code: '' })
      dispatch(getPharmaGroup())
    }

    const body = {
      Grp_Name: data?.Grp_Name || '',
      code: data?.code || '',
      updated_by: updated_by
    }
    if (type == 'Update' || type == 'Delete') {
      body['pharma_group_id'] = clickedData?.id || 0
    }

    if (type == 'Add') {
      dispatch(addPharmaGroup('add-pharmagroup', body, extra))
    } else if (type == 'Update') {
      dispatch(addPharmaGroup('update-pharmagroup', body, extra))
    } else if (type == 'Delete') {
      dispatch(deletePharmaGroup('delete-pharmagroup', body, extra))
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
            {type} Pharma Group
          </Typography>
        </DialogTitle>
        <DialogContent>
          {type == 'Delete' ? (
            <Typography>Are you sure you want to delete this Pharma Group?</Typography>
          ) : (
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Group Name'
                  disabled={type == 'View' ? true : false}
                  value={data?.Grp_Name}
                  name='Grp_Name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Group Code'
                  disabled={type == 'View' ? true : false}
                  value={data?.code}
                  name='code'
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
              setData({ Grp_Name: '', code: '' })
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
