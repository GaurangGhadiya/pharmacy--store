import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@mui/material'
import React, { useState } from 'react'
import PageHeader from 'src/@core/components/page-header'
import CustomChip from 'src/@core/components/mui/chip'
import { DataGrid } from '@mui/x-data-grid'
import orderData from '../../staticData/orderData'
import Icon from 'src/@core/components/icon'
import CustomAvatar from 'src/@core/components/mui/avatar'

const OrderDetails = () => {
  const renderClient = () => {
    return (
      <div
        style={{
          height: '40px',
          width: '40px',
          backgroundColor: '#F2F2F3',
          borderRadius: '6px',
          marginRight: '10px'
        }}
      >
        <CustomAvatar
          src={'https://demos.pixinvent.com/vuexy-html-admin-template/assets/img/ecommerce-images/product-9.png'}
          sx={{ mr: 2.5, width: 38, height: 38, borderRadius: 1 }}
          skin='light'
          color={'primary'}
        />
      </div>
    )
  }

  const Historycolumns = [
    {
      flex: 0.4,
      minWidth: 120,
      field: 'dueDate',
      sortable: false,
      filterable: false,
      headerName: 'DATE ADDED',
      renderCell: ({ row }) => <Typography>{row.dueDate}</Typography>
    },
    {
      flex: 0.7,
      minWidth: 190,
      field: 'service',
      sortable: false,
      filterable: false,
      headerName: 'COMMENT',
      renderCell: ({ row }) => <Typography>Order received by customer </Typography>
    },
    {
      flex: 0.4,
      minWidth: 130,
      field: 'company',
      sortable: false,
      filterable: false,
      headerName: 'ORDER STATUS',
      renderCell: ({ row }) => <CustomChip rounded size='small' skin='light' color='success' label='Delivered' />
    },
    {
      flex: 0.5,
      minWidth: 70,
      field: 'invoiceStatus',
      sortable: false,
      filterable: false,
      headerName: 'CUSTOMER NOTIFED',
      renderCell: ({ row }) => <Typography>{row.index % 2 == 0 ? 'Yes' : 'No'}</Typography>
    }
  ]

  const columns = [
    {
      flex: 0.2,
      minWidth: 300,
      field: 'fullName',
      sortable: false,
      filterable: false,
      headerName: 'Products',
      renderCell: ({ row }) => {
        const { name, email } = row

        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {renderClient(row)}
            <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
              <Typography
                noWrap
                sx={{
                  fontWeight: 500,
                  textDecoration: 'none',
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {name}
              </Typography>
              {/* <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                {email}
              </Typography> */}
            </Box>
          </Box>
        )
      }
    },

    {
      flex: 0.3,
      minWidth: 170,
      field: 'balance',
      sortable: false,
      filterable: false,
      headerName: 'Price',
      renderCell: ({ row }) => <Typography>₹{row.balance}</Typography>
    },

    {
      flex: 0.15,
      minWidth: 180,
      field: 'company',
      sortable: false,
      filterable: false,
      headerName: 'Quantity',
      renderCell: ({ row }) => <Typography>{Math.floor(Math.random() * 99) + 1}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 50,
      field: 'total',
      sortable: false,
      filterable: false,
      headerName: 'Total',
      renderCell: ({ row }) => <Typography>₹{row.total}</Typography>
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <PageHeader
            title={
              <Box display={'flex'}>
                <Typography variant='h4'>Order #32543</Typography>{' '}
                <CustomChip rounded label='Paid' skin='light' color='success' style={{ margin: '0 10px' }} />
                <CustomChip rounded label='Ready to Pickup' skin='light' color='info' />
              </Box>
            }
            subtitle={<Typography sx={{ color: 'text.secondary' }}>Aug 17, 2024, 5:48 (ET)</Typography>}
          />
        </Grid>
        <Grid item xs={12} md={6} textAlign={'right'}>
          <Button variant='tonal' color='error'>
            Delete Order
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={6} mt={0}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title='Order details' />
            <Divider />
            <CardContent style={{ padding: 0 }}>
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={orderData}
                columns={columns}
                disableRowSelectionOnClick
                pagination={false}
                pageSize={orderData.length}
                hideFooter
                hideFooterPagination
                disableColumnMenu
              />
              <Box textAlign={'right'} style={{ padding: '20px 60px' }}>
                <Box display={'flex'} justifyContent={'right'}>
                  <Typography>Sub Total:</Typography>
                  <Typography style={{ width: '120px' }} variant='h6'>
                    ₹9589
                  </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'right'} my={2}>
                  <Typography>Tax:</Typography>
                  <Typography style={{ width: '120px' }} variant='h6'>
                    ₹25
                  </Typography>
                </Box>
                <Box display={'flex'} justifyContent={'right'}>
                  <Typography>Total:</Typography>
                  <Typography style={{ width: '120px' }} variant='h6'>
                    ₹10111
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Order History' />
            <Divider />
            <CardContent style={{ padding: 0 }}>
              <DataGrid
                autoHeight
                rowHeight={62}
                rows={orderData}
                columns={Historycolumns}
                disableRowSelectionOnClick
                pagination={false}
                hideFooter
                hideFooterPagination
                disableColumnMenu
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Customer details' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {renderClient()}
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column' }}>
                      <Typography
                        noWrap
                        sx={{
                          fontWeight: 500,
                          textDecoration: 'none',
                          color: 'text.secondary',
                          '&:hover': { color: 'primary.main' }
                        }}
                      >
                        Gaurang Ghadiya
                      </Typography>
                      <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
                        Customer ID: #58909
                      </Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 6, marginBottom: 6 }}>
                    <CustomAvatar color='success'>
                      <Icon icon='tabler:shopping-cart' />
                    </CustomAvatar>
                    <Typography
                      noWrap
                      sx={{
                        fontWeight: 500,
                        textDecoration: 'none',
                        color: 'text.secondary',
                        marginLeft: 2
                      }}
                    >
                      12 Orders
                    </Typography>
                  </Box>
                  <Typography sx={{ fontWeight: '600', marginBottom: 3, fontSize: 16 }}>Contact info</Typography>
                  <Typography>Email: Shamus889@yahoo.com</Typography>
                  <Typography>Mobile: +1 (609) 972-22-22</Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Shipping address' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500 }}>John Doe (Default),</Typography>
                    <Typography>4135 Parkway Street,</Typography>
                    <Typography>Los Angeles, CA, 90017.</Typography>
                    <Typography>Mobile : +1 906 568 2332</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Billing address' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography sx={{ fontWeight: 500 }}>John Doe (Default),</Typography>
                    <Typography>4135 Parkway Street,</Typography>
                    <Typography>Los Angeles, CA, 90017.</Typography>
                    <Typography>Mobile : +1 906 568 2332</Typography>
                    <Typography sx={{ fontWeight: '600', marginTop: 5, marginBottom: 1, fontSize: 16 }}>
                      Mastercard
                    </Typography>
                    <Typography>Card Number: ******4291</Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  )
}

export default OrderDetails
