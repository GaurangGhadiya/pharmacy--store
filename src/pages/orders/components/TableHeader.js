// ** Next Import
import Link from 'next/link'

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import Icon from 'src/@core/components/icon'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

const TableHeader = props => {
  // ** Props
  const { value, selectedRows, handleFilter } = props

  return (
    <Box
      sx={{
        p: 5,
        pb: 3,
        width: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CustomTextField
        value={value}
        sx={{ mr: 4, mb: 2 }}
        placeholder='Search Order'
        onChange={e => handleFilter(e.target.value)}
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button color='secondary' variant='tonal' startIcon={<Icon icon='tabler:upload' />} sx={{ mr: 4 }}>
          Export
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
