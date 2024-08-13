import { Box, Button, Grid, MenuItem } from '@mui/material'
import React, { forwardRef, useEffect, useState } from 'react'
import CustomTextField from 'src/@core/components/mui/text-field'

import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { useDispatch, useSelector } from 'react-redux'
import { getSupplierMaster } from 'src/network/actions/getSupplierMaster'

const CustomInput = forwardRef((props, ref) => {
  return <CustomTextField fullWidth {...props} inputRef={ref} label={props.label} autoComplete='off' />
})

const Step1 = ({ handleNext, formData, setFormData, handleChange }) => {
  const dispatch = useDispatch()
  const getSupplierMasterData = useSelector(store => store?.getSupplierMasters?.data)
  console.log('getSupplierMasterData', getSupplierMasterData)

  useEffect(() => {
    dispatch(getSupplierMaster())
  }, [])

  return (
    <>
      <Grid container spacing={5} mt={5}>
        <Grid item sx={12} sm={4}>
          <CustomTextField
            fullWidth
            label='Reciving No.'
            name='recivingNumber'
            value={formData?.recivingNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={4}>
          <CustomTextField
            fullWidth
            label='Ledger No./P.O No.'
            name='ledger'
            value={formData?.ledger}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={4}>
          <CustomTextField
            fullWidth
            label='Invoice No.'
            name='invoiceNumber'
            value={formData?.invoiceNumber}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sx={12} sm={4}>
          <DatePicker
            selected={formData?.recivingDate}
            showYearDropdown
            showMonthDropdown
            placeholderText='MM-DD-YYYY'
            customInput={<CustomInput label='Reciving Date' />}
            id='form-layouts-separator-date'
            onChange={date => handleChange(date, 'recivingDate')}
          />
        </Grid>
        <Grid item sx={12} sm={4}>
          <DatePicker
            selected={formData?.poDate}
            showYearDropdown
            showMonthDropdown
            placeholderText='MM-DD-YYYY'
            customInput={<CustomInput label='P.O Date' />}
            id='form-layouts-separator-date'
            onChange={date => handleChange(date, 'poDate')}
          />
        </Grid>
        <Grid item sx={12} sm={4}>
          <DatePicker
            selected={formData?.invoiceDate}
            showYearDropdown
            showMonthDropdown
            placeholderText='MM-DD-YYYY'
            customInput={<CustomInput label='Invoice Date' />}
            id='form-layouts-separator-date'
            onChange={date => handleChange(date, 'invoiceDate')}
          />
        </Grid>
        <Grid item sx={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            label='Supplier Name'
            //   defaultValue={clickedData?.Mnfctrng_Id}
            onChange={handleChange}
            name='supplierName'
          >
            <MenuItem value=''>Select Menufacturer Name</MenuItem>
            {getSupplierMasterData?.map(v => (
              <MenuItem value={v?.id} key={v?.id}>
                {v?.Splr_Name}
              </MenuItem>
            ))}
          </CustomTextField>
        </Grid>
        <Grid item sx={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            label='Drug Type'
            //   defaultValue={clickedData?.Mnfctrng_Id}
            onChange={handleChange}
            name='drugType'
          >
            <MenuItem value=''>Select Drug Type</MenuItem>
            <MenuItem value='Medicine'>Medicine</MenuItem>
            <MenuItem value='Surgical'>Surgical</MenuItem>
            <MenuItem value='Pathological'>Pathological</MenuItem>
            <MenuItem value='X-Ray'>X-Ray</MenuItem>
            <MenuItem value='Misc.'>Misc.</MenuItem>
            <MenuItem value='Others'>Others</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item sx={12} sm={4}>
          <CustomTextField
            select
            fullWidth
            label='Purchase Type'
            //   defaultValue={clickedData?.Mnfctrng_Id}
            onChange={handleChange}
            name='purchaseType'
          >
            <MenuItem value=''>Select Purchase Type</MenuItem>
            <MenuItem value='Annual Indent'>Annual Indent</MenuItem>
            <MenuItem value='Bulk Indent'>Bulk Indent</MenuItem>
            <MenuItem value='Others'>Others</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid item sm={6}>
          <CustomTextField
            fullWidth
            rows={3}
            label='Address'
            multiline
            placeholder='Enter address'
            name='address'
            value={formData?.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item sm={6}>
          <CustomTextField
            fullWidth
            rows={3}
            label='Remarks'
            multiline
            placeholder='Enter remarks'
            name='remarks'
            value={formData?.remarks}
            onChange={handleChange}
          />
        </Grid>
      </Grid>
      <Box textAlign={'center'} mt={5}>
        <Button onClick={handleNext} variant='contained'>
          Next
        </Button>
      </Box>
    </>
  )
}

export default Step1
