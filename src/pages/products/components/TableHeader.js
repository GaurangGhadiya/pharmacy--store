// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Icon Imports
import Icon from 'src/@core/components/icon'
import { useRouter } from 'next/router'

const TableHeader = props => {
  const router = useRouter()

  // ** Props
  const { handleFilter, value, name } = props

  return (
    <Box
      sx={{
        py: 4,
        px: 6,
        rowGap: 2,
        columnGap: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <CustomTextField
        value={value}
        sx={{ mr: 4, mb: 2 }}
        placeholder='Search Name'
        onChange={e => handleFilter(e)}
        name={name}
      />{' '}
      <Box sx={{ rowGap: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Button color='secondary' variant='tonal' startIcon={<Icon icon='tabler:upload' />} sx={{ mr: 4 }}>
          Export
        </Button>
        <Button onClick={() => router.push('/products/add-product')} variant='contained' sx={{ '& svg': { mr: 2 } }}>
          <Icon fontSize='1.125rem' icon='tabler:plus' />
          Add Product
        </Button>
      </Box>
    </Box>
  )
}

export default TableHeader
