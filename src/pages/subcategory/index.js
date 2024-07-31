// ** React Imports
import { useState, useEffect, forwardRef } from 'react'

// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import Tooltip from '@mui/material/Tooltip'
import { styled } from '@mui/material/styles'
import MenuItem from '@mui/material/MenuItem'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { DataGrid } from '@mui/x-data-grid'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Third Party Imports
import format from 'date-fns/format'
import DatePicker from 'react-datepicker'

// ** Store & Actions Imports
import { useDispatch, useSelector } from 'react-redux'

// import { fetchData, deleteInvoice } from 'src/store/apps/invoice'

// ** Utils Import
import { getInitials } from 'src/@core/utils/get-initials'

// ** Custom Components Imports
import CustomChip from 'src/@core/components/mui/chip'
import CustomAvatar from 'src/@core/components/mui/avatar'
import OptionsMenu from 'src/@core/components/option-menu'

// import TableHeader from 'src/views/apps/invoice/list/TableHeader'
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Styled Components
import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import data from '../../staticData/subcategory'
import TableHeader from './components/TableHeader'
import { Menu, Pagination } from '@mui/material'
import { borderRadius } from '@mui/system'
import AddSubCategoryDrawer from './components/AddSubCategoryDrawer'
import removeEmptyKeys from 'src/utils/ObjectClean'
import { getSubCategory } from 'src/network/actions/getSubCategory'
import { getCategoryList } from 'src/network/actions/getCategoryList'

// ** renders client column
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
    headerName: 'Sub Categories',
    renderCell: ({ row }) => {
      const { name, details } = row

      return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {renderClient(row)}
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography noWrap sx={{ color: 'text.secondary', fontWeight: 500 }}>
              {name}
            </Typography>
            <Typography noWrap variant='body2' sx={{ color: 'text.disabled' }}>
              {details}
            </Typography>
          </Box>
        </Box>
      )
    }
  },
  {
    flex: 0.17,
    field: 'category_name',
    minWidth: 190,
    headerName: 'Category'
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'total',
    headerName: 'Total Products',
    renderCell: ({ row }) => <Typography>{Math.floor(Math.random() * 99) + 1}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 100,
    field: 'invoiceStatus',
    headerName: 'Total Earnings',
    renderCell: ({ row }) => (
      <Typography>₹{(Math.floor(Math.random() * (5000 - 1000 + 1)) + 1000)?.toFixed(2)}</Typography>
    )
  },
  {
    flex: 0.13,
    minWidth: 120,
    field: 'balance',
    headerName: 'Status',
    renderCell: ({ row }) => {
      return row.status == 0 ? (
        <CustomChip rounded size='small' skin='light' color='error' label='Inactive' />
      ) : (
        <CustomChip rounded size='small' skin='light' color='success' label='Active' />
      )
    }
  }
]

const RowOptions = ({ id, toggle, setEditData }) => {
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
            setEditData(id)
            toggle()
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

/* eslint-enable */
const SubCategories = () => {
  // ** State
  const dispatch = useDispatch()

  const getSubCategoryData = useSelector(store => store.getSubCategory?.data)
  const getCategoryData = useSelector(store => store?.getCategoryList?.data)

  console.log('getSubCategoryData', getSubCategoryData)

  const [addUserOpen, setAddUserOpen] = useState(false)
  const [editData, setEditData] = useState({})
  const [filteredValue, setFilteredValue] = useState({ status: null, name: '', page: 1, category_id: null })

  useEffect(() => {
    dispatch(getSubCategory(removeEmptyKeys(filteredValue)))
  }, [filteredValue])
  useEffect(() => {
    dispatch(getCategoryList())
  }, [])

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
      renderCell: ({ row }) => <RowOptions id={row} toggle={toggleAddUserDrawer} setEditData={setEditData} />
    }
  ]
  const toggleAddUserDrawer = () => setAddUserOpen(!addUserOpen)

  return (
    <DatePickerWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <CardHeader title='Filters' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Sub Category Status'
                    name='status'
                    SelectProps={{ value: filteredValue?.status, onChange: handleChangeFilter }}
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value=''>Select...</MenuItem>
                    <MenuItem value={1}>Active</MenuItem>
                    <MenuItem value={0}>Inactive</MenuItem>
                  </CustomTextField>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <CustomTextField
                    select
                    fullWidth
                    label='Category'
                    name='category_id'
                    SelectProps={{ value: filteredValue?.category_id, onChange: handleChangeFilter }}
                    onChange={handleChangeFilter}
                  >
                    <MenuItem value=''>Select...</MenuItem>
                    {getCategoryData?.map(v => (
                      <MenuItem value={v?.id} key={v?.id}>
                        {v?.name}
                      </MenuItem>
                    ))}
                  </CustomTextField>
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
              toggle={toggleAddUserDrawer}
            />
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={getSubCategoryData?.data || []}
              columns={columns}
              disableRowSelectionOnClick
              hideFooterPagination
              hideFooter
            />
            <Pagination
              style={{ float: 'right', margin: '15px 0' }}
              count={getSubCategoryData?.pagination?.totalPages}
              page={filteredValue?.page}
              onChange={(e, v) => setFilteredValue({ ...filteredValue, page: v })}
            />
          </Card>
        </Grid>
      </Grid>
      <AddSubCategoryDrawer
        open={addUserOpen}
        toggle={toggleAddUserDrawer}
        editData={editData}
        setEditData={setEditData}
      />
    </DatePickerWrapper>
  )
}

export default SubCategories
