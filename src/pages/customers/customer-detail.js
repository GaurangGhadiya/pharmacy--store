import { Button, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import PageHeader from 'src/@core/components/page-header'
import UserViewLeft from './components/UserViewLeft'
import UserViewRight from './components/UserViewRight'
import invoiceData from '../../staticData/invoiceData'

const CustomerDetail = () => {
  return (
    <>
      {/* <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <PageHeader
            title={
              <Typography variant='h4' mt={2}>
                Customer ID #634759
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} textAlign={'right'}>
          <Button variant='tonal' color='error'>
            Delete Customer
          </Button>
        </Grid>
      </Grid> */}

      <Grid container spacing={6}>
        <Grid item xs={12} md={5} lg={4}>
          <UserViewLeft />
        </Grid>
        <Grid item xs={12} md={7} lg={8}>
          <UserViewRight tab={'connection'} invoiceData={invoiceData} />
        </Grid>
      </Grid>
    </>
  )
}

export default CustomerDetail
