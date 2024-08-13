import { Box, Button, Grid, MenuItem } from '@mui/material'
import React, { useEffect } from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'
import Listing from './listing'
import { useDispatch, useSelector } from 'react-redux'
import { getSupplierMaster } from 'src/network/actions/getSupplierMaster'
import { getUnitMaster } from 'src/network/actions/getUnitMaster'
import { getTaxMaster } from 'src/network/actions/getTaxMaster'

const Step2 = ({ formData, setFormData, handleChange, addDrug, list, handleDelete, setisEditMode }) => {
  const dispatch = useDispatch()
  const getUnitMasterData = useSelector(store => store.getUnitMaster?.data)
  const getTaxMasterData = useSelector(store => store.getTaxMaster?.data)
  console.log('getUnitMasterData', getTaxMasterData)

  useEffect(() => {
    dispatch(getUnitMaster())
    dispatch(getTaxMaster())
  }, [])

  return (
    <>
      <Grid container spacing={5} mt={5}>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            fullWidth
            label='Item Description'
            name='description'
            value={formData?.description || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            label='Unit'
            defaultValue={formData?.unit || null}
            onChange={handleChange}
            // value={formData?.unit}
            name='unit'
          >
            <MenuItem value=''>Select Unit</MenuItem>
            {getUnitMasterData?.map(v => (
              <MenuItem value={v?.id} key={v?.id}>
                {v?.Unit_Name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            fullWidth
            label='Brand Name'
            name='brandName'
            value={formData?.brandName || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            fullWidth
            label='MFG By'
            name='mfgBy'
            value={formData?.mfgBy || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            fullWidth
            label='Batch No.'
            name='batchNumber'
            value={formData?.batchNumber || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={3} display={'flex'} justifyContent={'space-between'}>
          <CustomTextField
            select
            label='Exp Month'
            //   defaultValue={clickedData?.Mnfctrng_Id}
            onChange={handleChange}
            name='expMonth'
          >
            <MenuItem value=''>Select Month</MenuItem>
            <MenuItem value='1'>January</MenuItem>
            <MenuItem value='2'>February</MenuItem>
            <MenuItem value='3'>March</MenuItem>
            <MenuItem value='4'>April</MenuItem>
            <MenuItem value='5'>May</MenuItem>
            <MenuItem value='6'>June</MenuItem>
            <MenuItem value='7'>July</MenuItem>
            <MenuItem value='8'>Augest</MenuItem>
            <MenuItem value='9'>September</MenuItem>
            <MenuItem value='10'>Octomber</MenuItem>
            <MenuItem value='11'>November</MenuItem>
            <MenuItem value='12'>December</MenuItem>
          </CustomTextField>
          <CustomTextField
            select
            //   defaultValue={clickedData?.Mnfctrng_Id}
            onChange={handleChange}
            name='expYear'
            label='Exp Year'
          >
            <MenuItem value=''>Select Year</MenuItem>
            <MenuItem value='2024'>2024</MenuItem>
            <MenuItem value='2025'>2025</MenuItem>
            <MenuItem value='2026'>2026</MenuItem>
            <MenuItem value='2027'>2027</MenuItem>
            <MenuItem value='2028'>2028</MenuItem>
            <MenuItem value='2029'>2029</MenuItem>
            <MenuItem value='2030'>2030</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField fullWidth label='Item Qty.' name='qty' value={formData?.qty || ''} onChange={handleChange} />
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            fullWidth
            label='Unit Price'
            name='unitPrice'
            value={formData?.unitPrice || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            label='Tax On'
            //   defaultValue={clickedData?.Mnfctrng_Id}
            onChange={handleChange}
            name='taxOn'
          >
            <MenuItem value=''>Select Tax On</MenuItem>
            <MenuItem value='Unit Price'>Unit Price</MenuItem>
            <MenuItem value='None'>None</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            select
            fullWidth
            label='Tax Name'
            //   defaultValue={clickedData?.Mnfctrng_Id}
            onChange={handleChange}
            name='taxName'
          >
            <MenuItem value=''>Select Tax Name</MenuItem>
            {getTaxMasterData?.map(v => (
              <MenuItem value={v?.id} key={v?.id}>
                {v?.Tax_Name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            fullWidth
            label='Total Tax'
            name='totalTax'
            value={formData?.totalTax || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            fullWidth
            label='Purchase Price'
            name='purchasePrice'
            value={formData?.purchasePrice || ''}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={3}>
          <CustomTextField
            fullWidth
            label='Selling Price'
            name='sellingPrice'
            value={formData?.sellingPrice || ''}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box textAlign={'center'} mt={5}>
        <Button onClick={addDrug} variant='contained'>
          Add Drug
        </Button>
      </Box>
      <Box mt={10}>
        <Listing list={list} handleDelete={handleDelete} setFormData={setFormData} setisEditMode={setisEditMode} />
      </Box>
    </>
  )
}

export default Step2
