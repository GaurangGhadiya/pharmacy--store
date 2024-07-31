// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'
import { CardHeader } from '@mui/material'

const TableHeader = props => {
  // ** Props
  const { value, handleFilter, toggle, handleClickOpen } = props

  return (
    <Box
      sx={{
        pr: 5,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CardHeader title='Menufacturer List' />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button onClick={() => handleClickOpen('Add')} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Add Menufacturer
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
