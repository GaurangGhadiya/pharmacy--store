import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Pagination,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSeller } from 'src/network/actions/getSeller'
import removeEmptyKeys from 'src/utils/ObjectClean'
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import { DataGrid } from '@mui/x-data-grid'
import TableHeader from './components/TableHeader'
import CustomTextField from 'src/@core/components/mui/text-field'
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import { getInitials } from 'src/@core/utils/get-initials'
import { useRouter } from 'next/router'
import Icon from 'src/@core/components/icon'

const renderClient = row => {
  if (row.icon?.length) {
    return <CustomAvatar src={row.icon} sx={{ mr: 2.5, width: 38, height: 38, borderRadius: '4px' }} />
  } else {
    return (
      <CustomAvatar
        skin='light'
        color={row.avatarColor || 'primary'}
        sx={{
          mr: 2.5,
          width: 38,
          height: 38,
          fontWeight: 500,
          borderRadius: '4px',
          fontSize: theme => theme.typography.body1.fontSize
        }}
      >
        {getInitials(row.name || 'John Doe')}
      </CustomAvatar>
    )
  }
}

const defaultColumns = [
  {
    flex: 0.25,
    field: 'name',
    minWidth: 320,
    headerName: 'Seller',
    renderCell: ({ row }) => {
      const { name, email } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {email}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.15,
    field: 'mobile_no',
    minWidth: 110,
    headerName: 'Mobile Number'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'shop_name',
    headerName: 'Shop Name'
  },
  {
    flex: 0.17,
    minWidth: 190,
    field: 'shop_address',
    headerName: 'shop Address'
  },
  {
    flex: 0.13,
    minWidth: 120,
    field: 'is_active',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return row.is_active == 0 ? (
        <CustomChip rounded size='small' skin='light' color='error' label='Inactive' />
      ) : (
        <CustomChip rounded size='small' skin='light' color='success' label='Active' />
      )
    }
  }
]

const RowOptions = ({ id }) => {
  const router = useRouter()
  const [anchorEl, setAnchorEl] = useState(null)
  const rowOptionsOpen = Boolean(anchorEl)

  const handleRowOptionsClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleRowOptionsClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    handleRowOptionsClose()
  }

  return (
    <>
      <IconButton size='small' onClick={handleRowOptionsClick}>
        <Icon icon='tabler:dots-vertical' />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {/* <MenuItem sx={{ '& svg': { mr: 2 } }} onClick={handleRowOptionsClose}>
          <Icon icon='tabler:eye' fontSize={20} />
          View
        </MenuItem> */}
        <MenuItem
          onClick={() => {
            handleRowOptionsClose()
            router.push(`/sellers/add-seller?id=${id}`)
          }}
          sx={{ '& svg': { mr: 2 } }}
        >
          <Icon icon='tabler:edit' fontSize={20} />
          Edit
        </MenuItem>
        {/* <MenuItem onClick={handleDelete} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon='tabler:trash' fontSize={20} />
          Delete
        </MenuItem> */}
      </Menu>
    </>
  )
}

const Sellers = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const getSellerList = useSelector(store => store.getSeller?.data)

  const [filteredValue, setFilteredValue] = useState({
    is_active: null,
    name: '',
    page: 1,
    shop_name: null,
    mobile_no: ''
  })
  console.log('getSellerList', getSellerList)

  useEffect(() => {
    dispatch(getSeller(removeEmptyKeys(filteredValue)))
  }, [filteredValue])

  const handleChangeFilter = e => {
    const { name, value } = e.target

    setFilteredValue({ ...filteredValue, [name]: value })
  }

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',

      renderCell: ({ row }) => <RowOptions id={row?.id} />
    }
  ]

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Seller Status'
                    name='is_active'
                    SelectProps={{ value: filteredValue?.is_active, onChange: handleChangeFilter }}
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value=''>Select...</MenuItem>
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Inactive</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    label='Shop Name'
                    fullWidth
                    sx={{ mr: 4, mb: 2 }}
                    placeholder='Search Shop Name'
                    onChange={handleChangeFilter}
                    name={'shop_name'}
                    value={filteredValue?.shop_name}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CustomTextField
                    label='Mobile Number'
                    fullWidth
                    sx={{ mr: 4, mb: 2 }}
                    placeholder='Search Mobile Number'
                    onChange={handleChangeFilter}
                    name={'mobile_no'}
                    value={filteredValue?.mobile_no}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Card>
            <TableHeader
              name='name'
              value={filteredValue?.name}
              handleFilter={handleChangeFilter}
              toggle={() => router.push('/sellers/add-seller')}
            />
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={getSellerList?.data || []}
              columns={columns}
              disableRowSelectionOnClick
              hideFooterPagination
              hideFooter
            />
            <Pagination
              style={{ float: 'right', margin: '15px 0' }}
              count={getSellerList?.pagination?.totalPages}
              page={filteredValue?.page}
              onChange={(e, v) => setFilteredValue({ ...filteredValue, page: v })}
            />
          </Card>
        </Grid>
      </Grid>
    </DatePickerWrapper>
  )
}

export default Sellers
