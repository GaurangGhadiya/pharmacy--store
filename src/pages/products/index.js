// ** React Imports
import { useState, useEffect, useCallback } from 'react'

// ** Next Imports
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Menu from '@mui/material/Menu'
import Grid from '@mui/material/Grid'
import Divider from '@mui/material/Divider'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import CustomTextField from 'src/@core/components/mui/text-field'

import { getInitials } from 'src/@core/utils/get-initials'

import TableHeader from './components/TableHeader'
import data from '../../staticData/product'
import { borderRadius } from '@mui/system'
import { getProducts } from 'src/network/actions/getProducts'
import { BaseURLImage } from 'src/network/apiData'
import { Pagination } from '@mui/material'
import { getCategoryList } from 'src/network/actions/getCategoryList'
import removeEmptyKeys from 'src/utils/ObjectClean'
import { useRouter } from 'next/router'

// ** renders client column
const renderClient = row => {
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
        src={BaseURLImage + row?.thumbnail}
        sx={{ mr: 2.5, width: 38, height: 38, borderRadius: 1 }}
        skin='light'
        color={'primary'}
      />
    </div>
  )
}

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
            router.push(`/products/add-product?id=${id}`)
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

const columns = [
  {
    flex: 0.2,
    minWidth: 270,
    field: 'fullName',
    headerName: 'Product',
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
    flex: 0.15,
    field: 'category_id',
    minWidth: 170,
    headerName: 'Category'
  },
  {
    flex: 0.09,
    minWidth: 140,
    headerName: 'Price',
    field: 'unit_price',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ fontWeight: 500, color: 'text.secondary', textTransform: 'capitalize' }}>
          {row.unit_price}
        </Typography>
      )
    }
  },
  {
    flex: 0.05,
    minWidth: 150,
    field: 'min_qty',
    headerName: 'Quantity',
    renderCell: ({ row }) => {
      return (
        <Typography noWrap sx={{ color: 'text.secondary' }}>
          {row.min_qty}
        </Typography>
      )
    }
  },
  {
    flex: 0.13,
    minWidth: 130,
    headerName: 'SKU',
    field: 'code'
  },

  {
    flex: 0.1,
    minWidth: 110,
    field: 'status',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return row.status == 0 ? (
        <CustomChip rounded size='small' skin='light' color='error' label='Inactive' />
      ) : (
        <CustomChip rounded size='small' skin='light' color='success' label='Active' />
      )
    }
  },
  {
    flex: 0.1,
    minWidth: 100,
    sortable: false,
    field: 'actions',
    headerName: 'Actions',
    renderCell: ({ row }) => <RowOptions id={row.id} />
  }
]

const ProductList = () => {
  const dispatch = useDispatch()
  const getProductList = useSelector(store => store?.getProducts?.data)
  const getCategoryListData = useSelector(store => store?.getCategoryList?.data)

  console.log('getProductList', getProductList)

  const [filteredValue, setFilteredValue] = useState({ status: null, name: '', page: 1, category_id: '', code: '' })

  useEffect(() => {
    dispatch(getProducts())

    dispatch(getCategoryList())
  }, [])

  useEffect(() => {
    dispatch(getProducts(removeEmptyKeys(filteredValue)))
  }, [filteredValue])

  const handleChangeFilter = e => {
    const { name, value } = e.target

    setFilteredValue({ ...filteredValue, [name]: value })
  }

  return (
    <Grid container spacing={6.5}>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Search Filters' />
          <CardContent>
            <Grid container spacing={6}>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Status'
                  name='status'
                  onChange={handleChangeFilter}
                  SelectProps={{
                    value: filteredValue?.category_id,
                    displayEmpty: true,
                    onChange: handleChangeFilter
                  }}
                >
                  <MenuItem value=''>Select Status</MenuItem>
                  <MenuItem value={1}>Active</MenuItem>
                  <MenuItem value={0}>Inactive</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  select
                  fullWidth
                  defaultValue='Select Category'
                  onChange={handleChangeFilter}
                  name='category_id'
                  SelectProps={{
                    value: filteredValue?.category_id,
                    displayEmpty: true,
                    onChange: handleChangeFilter
                  }}
                >
                  <MenuItem value=''>Select Category</MenuItem>
                  {getCategoryListData?.map(v => (
                    <MenuItem value={v?.id} key={v?.id}>
                      {v?.name}
                    </MenuItem>
                  ))}
                </CustomTextField>
              </Grid>
              <Grid item sm={4} xs={12}>
                <CustomTextField
                  value={filteredValue?.code}
                  fullWidth
                  placeholder='Search Code'
                  onChange={handleChangeFilter}
                  name={'code'}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider sx={{ m: '0 !important' }} />
          <TableHeader name='name' value={filteredValue?.name} handleFilter={handleChangeFilter} />
          <DataGrid
            autoHeight
            rowHeight={62}
            rows={getProductList?.data || []}
            columns={columns}
            disableRowSelectionOnClick
            hideFooter
            hideFooterPagination

            // pageSizeOptions={[10, 25, 50]}
            // paginationModel={paginationModel}
            // onPaginationModelChange={setPaginationModel}
          />
          <Pagination
            style={{ float: 'right', margin: '15px 0' }}
            count={getProductList?.pagination?.totalPages}
            page={filteredValue?.page}
            onChange={(e, v) => setFilteredValue({ ...filteredValue, page: v })}
          />
        </Card>
      </Grid>

      {/* <AddUserDrawer open={addUserOpen} toggle={toggleAddUserDrawer} /> */}
    </Grid>
  )
}

export default ProductList
