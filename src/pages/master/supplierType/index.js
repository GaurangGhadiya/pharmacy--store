import { Box, Card, Grid, Pagination } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import Icon from 'src/@core/components/icon'
import ActionModal from './ActionModal'
import { useDispatch, useSelector } from 'react-redux'
import { getMenufacturer } from 'src/network/actions/getMenufacturer'
import { getBrand } from 'src/network/actions/getBrand'
import { getSupplierType } from 'src/network/actions/getSupplierType'

const Suppliertype = () => {
  const dispatch = useDispatch()
  const getData = useSelector(store => store?.getSupplierType?.data)
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(null)
  const [clickedData, setClickedData] = useState({})
  const [page, setPage] = useState(1)

  console.log('getData', getData)

  useEffect(() => {
    dispatch(getSupplierType(page))
  }, [page])

  const handleClickOpen = (type, row = {}) => {
    setOpen(true)
    setType(type)
    setClickedData(row?.row)
  }

  const handleClose = () => {
    setOpen(false)
    setType(null)
    setClickedData({})
  }

  const RowOptions = row => {
    return (
      <>
        <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} width={'500px'}>
          <Box mr={5} style={{ cursor: 'pointer' }} onClick={() => handleClickOpen('View', row)}>
            <Icon icon='tabler:eye' fontSize={20} />
          </Box>
          <Box mr={5} style={{ cursor: 'pointer' }} onClick={() => handleClickOpen('Update', row)}>
            <Icon icon='tabler:edit' fontSize={20} />
          </Box>
          <Box mr={5} style={{ cursor: 'pointer' }} onClick={() => handleClickOpen('Delete', row)}>
            <Icon icon='tabler:trash' fontSize={20} />
          </Box>
        </Box>
      </>
    )
  }

  const defaultColumns = [
    {
      flex: 0.9,
      minWidth: 120,
      field: 'Spplr_Typ',
      headerName: 'Supplicer Type'
    }
  ]

  const columns = [
    ...defaultColumns,
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions row={row} />
    }
  ]

  return (
    <>
      <Grid container spacing={6}>
        <Grid item xs={12}>
          <Card>
            <TableHeader handleClickOpen={handleClickOpen} />
            <DataGrid
              autoHeight
              pagination
              rowHeight={62}
              rows={getData || []}
              columns={columns}
              disableRowSelectionOnClick
              hideFooter
              hideFooterPagination
            />
            <Pagination
              style={{ float: 'right', margin: '15px 0' }}
              count={10}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          </Card>
        </Grid>
      </Grid>
      <ActionModal open={open} handleClose={handleClose} type={type} clickedData={clickedData} />
    </>
  )
}

export default Suppliertype
