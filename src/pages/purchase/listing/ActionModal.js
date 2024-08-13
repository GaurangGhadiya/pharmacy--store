import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import CustomTextField from 'src/@core/components/mui/text-field'
import { Checkbox, FormControlLabel, FormLabel, Grid, MenuItem } from '@mui/material'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMenufacturer } from 'src/network/actions/addMenufacturer'
import { getMenufacturer } from 'src/network/actions/getMenufacturer'
import { updated_by } from 'src/network/apiData'
import { deleteMenufacturer } from 'src/network/actions/deleteMenufacturer'
import { getBrand } from 'src/network/actions/getBrand'
import { addBrand } from 'src/network/actions/addBrand'
import { deleteBrand } from 'src/network/actions/deleteBrand'
import { getPharmaGroupMaster } from 'src/network/actions/getPharmaGroupMaster'
import { getMenufacturerMaster } from 'src/network/actions/getMenufacturerMaster'
import { getDrug } from 'src/network/actions/getDrug'
import { addDrug } from 'src/network/actions/addDrug'
import { deleteDrug } from 'src/network/actions/deleteDrug'

const ActionModal = ({ open, handleClose, type, clickedData }) => {
  const dispatch = useDispatch()
  const getPharmaGroupMasterData = useSelector(store => store?.getPharmaGroupMaster?.data)
  const getMenufacturerMasterData = useSelector(store => store?.getMenufacturerMaster?.data)
  console.log('getPharmaGroupMasterData', { getPharmaGroupMasterData, getMenufacturerMasterData })

  const [data, setData] = useState({
    Item_Desc: '',
    Mnfctrng_Id: '',
    Grp_Id: '',
    dose: '',
    Srgcl: false,
    IVF: false,
    H1: false,
    Nrctc: false,
    days: '',
    quantity: '',
    Shlf_No: '',
    side_effects: '',
    contraindication: '',
    uses: '',
    item_code: '',
    NotPrchg: false
  })

  useEffect(() => {
    dispatch(getPharmaGroupMaster())
    dispatch(getMenufacturerMaster())
  }, [])

  useEffect(() => {
    setData({
      Item_Desc: clickedData?.Item_Desc,
      Mnfctrng_Id: clickedData?.Mnfctrng_Id,
      Grp_Id: clickedData?.Grp_Id,
      dose: clickedData?.dose,
      Srgcl: clickedData?.Srgcl == '0' ? false : true,
      IVF: clickedData?.IVF == '0' ? false : true,
      H1: clickedData?.H1 == '0' ? false : true,
      Nrctc: clickedData?.Nrctc == '0' ? false : true,
      days: clickedData?.days,
      quantity: clickedData?.quantity,
      Shlf_No: clickedData?.Shlf_No,
      side_effects: clickedData?.side_effects,
      contraindication: clickedData?.contraindication,
      uses: clickedData?.uses,
      item_code: clickedData?.item_code,
      NotPrchg: clickedData?.NotPrchg == '0' ? false : true
    })
  }, [clickedData])

  const handleChange = e => {
    const { name, value } = e.target
    setData({ ...data, [name]: value })
  }
  console.log('clickedData', clickedData, type)

  const handleSubmit = () => {
    const extra = () => {
      handleClose()
      setData({
        Item_Desc: '',
        Mnfctrng_Id: '',
        Grp_Id: '',
        dose: '',
        Srgcl: '',
        IVF: '',
        H1: '',
        Nrctc: '',
        days: '',
        quantity: '',
        Shlf_No: '',
        side_effects: '',
        contraindication: '',
        uses: '',
        item_code: '',
        NotPrchg: ''
      })
      dispatch(getDrug())
    }

    const body = {
      Item_Desc: data?.Item_Desc,
      Mnfctrng_Id: data?.Mnfctrng_Id,
      Grp_Id: data?.Grp_Id,
      dose: data?.dose,
      Srgcl: data?.Srgcl || false,
      IVF: data?.IVF || false,
      H1: data?.H1 || false,
      Nrctc: data?.Nrctc || false,
      days: data?.days,
      quantity: data?.quantity,
      Shlf_No: data?.Shlf_No,
      side_effects: data?.side_effects,
      contraindication: data?.contraindication,
      uses: data?.uses,
      item_code: data?.item_code,
      NotPrchg: data?.NotPrchg || false,
      updated_by: updated_by
    }
    if (type == 'Update' || type == 'Delete') {
      body['item_id'] = clickedData?.id || 0
    }

    if (type == 'Add') {
      dispatch(addDrug('add-item', body, extra))
    } else if (type == 'Update') {
      dispatch(addDrug('update-item', body, extra))
    } else if (type == 'Delete') {
      dispatch(deleteDrug('delete-item', body, extra))
    }
  }

  console.log('data', data)

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
            {type} Drug
          </Typography>
        </DialogTitle>
        <DialogContent>
          {type == 'Delete' ? (
            <Typography>Are you sure you want to delete this drug?</Typography>
          ) : (
            <Grid container spacing={5}>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Item Name'
                  disabled={type == 'View' ? true : false}
                  value={data?.Item_Desc}
                  name='Item_Desc'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Drug Code'
                  disabled={type == 'View' ? true : false}
                  value={data?.item_code}
                  name='item_code'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Group Name'
                  disabled={type == 'View' ? true : false}
                  defaultValue={clickedData?.Grp_Id}
                  onChange={handleChange}
                  name='Grp_Id'
                >
                  <MenuItem value=''>Select Group Name</MenuItem>
                  {getPharmaGroupMasterData?.map(v => (
                    <MenuItem value={v?.id} key={v?.id}>
                      {v?.Grp_Name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Menufacturer'
                  disabled={type == 'View' ? true : false}
                  defaultValue={clickedData?.Mnfctrng_Id}
                  onChange={handleChange}
                  name='Mnfctrng_Id'
                >
                  <MenuItem value=''>Select Menufacturer Name</MenuItem>
                  {getMenufacturerMasterData?.map(v => (
                    <MenuItem value={v?.id} key={v?.id}>
                      {v?.mnfctrer_name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>

              <Grid item sm={12}>
                <FormLabel>Drug Type</FormLabel>
                {/* <FormControlLabel label='H1 Drug' control={<Checkbox name='validation-basic-checkbox' />} /> */}
              </Grid>
              <Grid item sm={12} style={{ marginTop: '-25px' }}>
                {/* <FormLabel>Drug Type</FormLabel> */}
                <FormControlLabel
                  label='H1 Drug'
                  control={
                    <Checkbox name='H1' checked={data?.H1} onChange={e => setData({ ...data, H1: e.target.checked })} />
                  }
                />
                <FormControlLabel
                  label='IVF'
                  control={
                    <Checkbox
                      name='IVF'
                      checked={data?.IVF}
                      onChange={e => setData({ ...data, IVF: e.target.checked })}
                    />
                  }
                />
                <FormControlLabel
                  label='Surgical Drug'
                  control={
                    <Checkbox
                      name='Srgcl'
                      checked={data?.Srgcl}
                      onChange={e => setData({ ...data, Srgcl: e.target.checked })}
                    />
                  }
                />
                <FormControlLabel
                  label='Narcotic Drug'
                  control={
                    <Checkbox
                      name='Nrctc'
                      checked={data?.Nrctc}
                      onChange={e => setData({ ...data, Nrctc: e.target.checked })}
                    />
                  }
                />
                <FormControlLabel
                  label='N.P.'
                  control={
                    <Checkbox
                      name='NotPrchg'
                      checked={data?.NotPrchg}
                      onChange={e => setData({ ...data, NotPrchg: e.target.checked })}
                    />
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  select
                  fullWidth
                  label='Standred Dose'
                  disabled={type == 'View' ? true : false}
                  defaultValue={clickedData?.dose}
                  onChange={handleChange}
                  name='dose'
                >
                  <MenuItem value=''>Select Dose</MenuItem>
                  <MenuItem value='S.O.S'>S.O.S</MenuItem>
                  <MenuItem value='O.D'>O.D</MenuItem>
                  <MenuItem value='TSF'>TSF</MenuItem>
                  <MenuItem value='BID'>BID</MenuItem>
                  <MenuItem value='TID'>TID</MenuItem>
                  <MenuItem value='QID'>QID</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Days'
                  disabled={type == 'View' ? true : false}
                  value={data?.days}
                  name='days'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Standred Dose Quantity'
                  disabled={type == 'View' ? true : false}
                  value={data?.quantity}
                  name='quantity'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  label='Shelf No.'
                  disabled={type == 'View' ? true : false}
                  value={data?.Shlf_No}
                  name='Shlf_No'
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  rows={5}
                  label='Side Effects'
                  disabled={type == 'View' ? true : false}
                  multiline
                  placeholder='Enter side effects'
                  name='side_effects'
                  value={data?.side_effects}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  rows={5}
                  label='Contraindication'
                  disabled={type == 'View' ? true : false}
                  multiline
                  placeholder='Enter contraindication'
                  name='contraindication'
                  value={data?.contraindication}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <CustomTextField
                  fullWidth
                  rows={5}
                  label='Uses'
                  disabled={type == 'View' ? true : false}
                  multiline
                  placeholder='Enter uses'
                  name='uses'
                  value={data?.uses}
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
                Item_Desc: '',
                Mnfctrng_Id: '',
                Grp_Id: '',
                dose: '',
                Srgcl: '',
                IVF: '',
                H1: '',
                Nrctc: '',
                days: '',
                quantity: '',
                Shlf_No: '',
                side_effects: '',
                contraindication: '',
                uses: '',
                item_code: ''
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
