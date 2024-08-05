import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Grid, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMenufacturer } from 'src/network/actions/addMenufacturer'
import { getMenufacturer } from 'src/network/actions/getMenufacturer'
import { updated_by } from 'src/network/apiData'
import { deleteMenufacturer } from 'src/network/actions/deleteMenufacturer'
import { getBrand } from 'src/network/actions/getBrand'
import { addBrand } from 'src/network/actions/addBrand'
import { deleteBrand } from 'src/network/actions/deleteBrand'
import { getSupplierTypeMaster } from 'src/network/actions/getSupplierTypeMaster'
import { getSupplier } from 'src/network/actions/getSupplier'
import { addSupplier } from 'src/network/actions/addSupplier'
import { deleteSupplier } from 'src/network/actions/deleteSupplier'

const ActionModal = ({ open, handleClose, type, clickedData }) => {
  const dispatch = useDispatch()
  const getSupplierTypeMasterData = useSelector(store => store?.getSupplierTypeMaster?.data)
  console.log('getSupplierTypeMasterData', getSupplierTypeMasterData)

  const [data, setData] = useState({
    Cntct_Prsn: '',
    Splr_Mail: '',
    Splr_Fax: '',
    Splr_Mob: '',
    Splr_Cntct_No: '',
    Splr_Addrss: '',
    Splr_Name: '',
    Splr_Typ_Id: ''
  })

  useEffect(() => {
    dispatch(getSupplierTypeMaster())
  }, [])

  useEffect(() => {
    setData({
      Cntct_Prsn: clickedData?.Cntct_Prsn,
      Splr_Mail: clickedData?.Splr_Mail,
      Splr_Fax: clickedData?.Splr_Fax,
      Splr_Mob: clickedData?.Splr_Mob,
      Splr_Cntct_No: clickedData?.Splr_Cntct_No,
      Splr_Addrss: clickedData?.Splr_Addrss,
      Splr_Name: clickedData?.Splr_Name,
      Splr_Typ_Id: clickedData?.Splr_Typ_Id
    })
  }, [clickedData])

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  console.log('clickedData', clickedData, data)

  const handleSubmit = () => {
    const extra = () => {
      handleClose()
      setData({
        Cntct_Prsn: '',
        Splr_Mail: '',
        Splr_Fax: '',
        Splr_Mob: '',
        Splr_Cntct_No: '',
        Splr_Addrss: '',
        Splr_Name: '',
        Splr_Typ_Id: ''
      })
      dispatch(getSupplier())
    }

    const body = {
      Cntct_Prsn: data?.Cntct_Prsn,
      Splr_Mail: data?.Splr_Mail,
      Splr_Fax: data?.Splr_Fax,
      Splr_Mob: data?.Splr_Mob,
      Splr_Cntct_No: data?.Splr_Cntct_No,
      Splr_Addrss: data?.Splr_Addrss,
      Splr_Name: data?.Splr_Name,
      Splr_Typ_Id: data?.Splr_Typ_Id,
      updated_by: updated_by
    }
    if (type == 'Update' || type == 'Delete') {
      body['supplier_id'] = clickedData?.id || 0
    }

    if (type == 'Add') {
      dispatch(addSupplier('add-supplier', body, extra))
    } else if (type == 'Update') {
      dispatch(addSupplier('update-supplier', body, extra))
    } else if (type == 'Delete') {
      dispatch(deleteSupplier('delete-supplier', body, extra))
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
            {type} Supplier
          </Typography>
        </DialogTitle>
        <DialogContent>
          {type == 'Delete' ? (
            <Typography>Are you sure you want to delete this supplier?</Typography>
          ) : (
            <Grid container spacing={5} paddingTop={'10px'} paddingBottom={'20px'}>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Supplier Name'
                  disabled={type == 'View' ? true : false}
                  value={data?.Splr_Name}
                  name='Splr_Name'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Supplier Type'
                  disabled={type == 'View' ? true : false}
                  defaultValue={clickedData?.Splr_Typ_Id}
                  onChange={handleChange}
                  name='Splr_Typ_Id'
                >
                  <MenuItem value=''>Select Supplier Type</MenuItem>
                  {getSupplierTypeMasterData?.map(v => (
                    <MenuItem value={v?.id} key={v?.id}>
                      {v?.Spplr_Typ}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  rows={5}
                  label='Supplier Address'
                  disabled={type == 'View' ? true : false}
                  multiline
                  placeholder='Enter address'
                  name='Splr_Addrss'
                  value={data?.Splr_Addrss}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Mobile Number'
                  disabled={type == 'View' ? true : false}
                  value={data?.Splr_Mob}
                  name='Splr_Mob'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Telephone Number'
                  disabled={type == 'View' ? true : false}
                  value={data?.Splr_Cntct_No}
                  name='Splr_Cntct_No'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Contact Person Name'
                  disabled={type == 'View' ? true : false}
                  value={data?.Cntct_Prsn}
                  name='Cntct_Prsn'
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Email Id'
                  disabled={type == 'View' ? true : false}
                  value={data?.Splr_Mail}
                  name='Splr_Mail'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Fax'
                  disabled={type == 'View' ? true : false}
                  value={data?.Splr_Fax}
                  name='Splr_Fax'
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
              setData({
                Cntct_Prsn: '',
                Splr_Mail: '',
                Splr_Fax: '',
                Splr_Mob: '',
                Splr_Cntct_No: '',
                Splr_Addrss: '',
                Splr_Name: '',
                Splr_Typ_Id: ''
              })
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
