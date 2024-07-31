import { Box, Card, Grid } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useState } from 'react'
import TableHeader from './TableHeader'
import Icon from 'src/@core/components/icon'
import ActionModal from './ActionModal'

let data = [
  {
    id: '1',
    name: 'abcd',
    number: '9016193206',
    address: 'mehli, shimla'
  },
  {
    id: '2',
    name: 'test',
    number: '6597235864',
    address: 'panthaghati, shimla'
  }
]

const Menufacturer = () => {
  const [open, setOpen] = useState(false)
  const [type, setType] = useState(null)

  const handleClickOpen = type => {
    setOpen(true)
    setType(type)
  }

  const handleClose = () => {
    setOpen(false)
    setType(null)
  }

  const RowOptions = () => {
    return (
      <>
        <Box display={'flex'} justifyContent={'flex-start'} alignItems={'center'} width={'500px'}>
          <Box mr={5} style={{ cursor: 'pointer' }} onClick={() => handleClickOpen('View')}>
            <Icon icon='tabler:eye' fontSize={20} />
          </Box>
          <Box mr={5} style={{ cursor: 'pointer' }} onClick={() => handleClickOpen('Update')}>
            <Icon icon='tabler:edit' fontSize={20} />
          </Box>
          <Box mr={5} style={{ cursor: 'pointer' }} onClick={() => handleClickOpen('Delete')}>
            <Icon icon='tabler:trash' fontSize={20} />
          </Box>
        </Box>
      </>
    )
  }

  const defaultColumns = [
    {
      flex: 0.09,
      minWidth: 120,
      field: 'name',
      headerName: 'Menufacturer Name'
    },
    {
      flex: 0.09,
      minWidth: 80,
      field: 'number',
      headerName: 'Contact Number'
    },
    {
      flex: 0.12,
      minWidth: 150,
      field: 'address',
      headerName: 'Address'
    }
  ]

  const columns = [
    ...defaultColumns,
    {
      flex: 0.05,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }) => <RowOptions />
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
              rows={data || []}
              columns={columns}
              disableRowSelectionOnClick
              hideFooter
              hideFooterPagination
            />
          </Card>
        </Grid>
      </Grid>
      <ActionModal open={open} handleClose={handleClose} type={type} />
    </>
  )
}

export default Menufacturer
