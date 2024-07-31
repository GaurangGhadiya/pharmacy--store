// ** React Imports
import { useEffect, useState } from 'react'

// ** MUI Imports
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import { styled } from '@mui/material/styles'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Custom Component Import
import CustomTextField from 'src/@core/components/mui/text-field'

// ** Third Party Imports
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'

// ** Icon Imports
import Icon from 'src/@core/components/icon'

// ** Store Imports
import { useDispatch, useSelector } from 'react-redux'
import { Divider, InputLabel } from '@mui/material'
import FileUploaderRestrictions from 'src/@core/components/FileUploaderRestrictions/FileUploaderRestrictions'
import toast from 'react-hot-toast'
import { getCode } from 'src/network/actions/getCode'
import { addCategory } from 'src/network/actions/addCategory'
import { getCategory } from 'src/network/actions/getCategory'

// ** Styles
const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(6),
  justifyContent: 'space-between'
}))

// ** Validation Schema
const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  code: yup.string().required('Code is required'),
  details: yup.string().required('Details are required'),
  status: yup.string().required('Status is required'),
  files: yup.array().min(1, 'File is required').max(1, 'You can only upload one file')
})

// ** Default Form Values
const defaultValues = {
  name: '',
  code: '',
  details: '',
  status: '',
  files: []
}

const AddCategoryDrawer = props => {
  const dispatch = useDispatch()
  const getCodeData = useSelector(store => store?.getCode?.data)
  const { open, toggle, editData, setEditData } = props
  console.log('editData', editData)

  // ** State
  const [files, setFiles] = useState([])

  // ** Hooks
  const {
    reset,
    control,
    setValue,
    handleSubmit,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  })

  console.log('errors', errors)

  useEffect(() => {
    if (open) {
      dispatch(getCode())
    }
  }, [open])

  useEffect(() => {
    if (getCodeData && !editData) {
      setValue('code', getCodeData)
    }
  }, [getCodeData, setValue])
  useEffect(() => {
    if (editData) {
      setValue('code', editData?.code)
      setValue('details', editData?.details)
      setValue('name', editData?.name)
      setValue('status', editData?.status)
      setValue('files', [editData?.icon])
    }
  }, [editData])

  const onSubmit = data => {
    const formData = new FormData()
    formData.append('name', data?.name)
    formData.append('details', data?.details)
    formData.append('status', data?.status)
    formData.append('categoryicon', data?.files?.[0])

    const extra = () => {
      dispatch(getCategory())
      toggle()
      reset()
      setEditData(null)
      setFiles([])
    }
    let url
    if (editData) {
      formData.append('category_id', editData?.id)

      url = 'update-category'
    } else {
      formData.append('code', data?.code)
      url = 'add-category'
    }

    dispatch(addCategory(url, formData, extra))
    console.log(data)
  }

  const handleClose = () => {
    toggle()
    reset()
    setEditData(null)
    setFiles([])
  }

  return (
    <Drawer
      open={open}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h5'>{editData ? 'Update' : 'Add'} Category</Typography>
        <IconButton
          size='small'
          onClick={handleClose}
          sx={{
            p: '0.438rem',
            borderRadius: 1,
            color: 'text.primary',
            backgroundColor: 'action.selected',
            '&:hover': {
              backgroundColor: theme => `rgba(${theme.palette.customColors.main}, 0.16)`
            }
          }}
        >
          <Icon icon='tabler:x' fontSize='1.125rem' />
        </IconButton>
      </Header>
      <Divider sx={{ marginBottom: 7 }} />
      <Box sx={{ p: theme => theme.spacing(0, 6, 6) }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                sx={{ mb: 4 }}
                label='Title'
                placeholder='Enter category title'
                error={Boolean(errors.name)}
                helperText={errors.name ? errors.name.message : ''}
                {...field}
              />
            )}
          />
          <Controller
            name='code'
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                sx={{ mb: 4 }}
                label='Slug'
                disabled
                placeholder='Enter slug'
                error={Boolean(errors.code)}
                helperText={errors.code ? errors.code.message : ''}
                {...field}
              />
            )}
          />
          <Box mb={4}>
            <Controller
              name='files'
              control={control}
              render={({ field }) => (
                <FileUploaderRestrictions
                  maxFiles={1}
                  files={files}
                  setFiles={acceptedFiles => {
                    setFiles(acceptedFiles)
                    setValue('files', acceptedFiles)
                  }}
                  error={errors.files || ''}
                />
              )}
            />
          </Box>
          <Controller
            name='details'
            control={control}
            render={({ field }) => (
              <CustomTextField
                fullWidth
                rows={5}
                multiline
                label='Description'
                placeholder='Enter description'
                id='textarea-outlined-static'
                error={Boolean(errors.details)}
                helperText={errors.details ? errors.details.message : ''}
                {...field}
                sx={{ mb: 4 }}
              />
            )}
          />
          <Controller
            name='status'
            control={control}
            render={({ field }) => (
              <CustomTextField
                select
                fullWidth
                sx={{ mb: 4 }}
                label='Select category status'
                error={Boolean(errors.status)}
                helperText={errors.status ? errors.status.message : ''}
                {...field}
              >
                <MenuItem value='1'>Active</MenuItem>
                <MenuItem value='0'>Inactive</MenuItem>
              </CustomTextField>
            )}
          />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button type='submit' variant='contained' sx={{ mr: 3 }}>
              {editData ? 'Update' : 'Add'}
            </Button>
            <Button variant='tonal' color='error' onClick={handleClose}>
              Discard
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default AddCategoryDrawer
