import { yupResolver } from '@hookform/resolvers/yup'
import { Box, Button, Card, CardContent, CardHeader, Grid, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import FileUploaderRestrictions from 'src/@core/components/FileUploaderRestrictions/FileUploaderRestrictions'
import CustomTextField from 'src/@core/components/mui/text-field'
import PageHeader from 'src/@core/components/page-header'
import BlankLayout from 'src/@core/layouts/BlankLayout'
import { addSeller } from 'src/network/actions/addSeller'
import * as yup from 'yup'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  mobile_no: yup.string().required('Mobile Number is required'),
  email: yup.string().required('Email Id is required'),
  password: yup.string().required('Password is required'),
  shop_name: yup.string().required('Shop Name is required'),
  shop_address: yup.string().required('Shop Address is required'),
  seller_image: yup.array().min(1, 'Seller Image is required'),
  shop_logo: yup.array().min(1, 'Shop logo is required'),
  shop_banner: yup.array().min(1, 'Shop Banner is required'),
  is_active: yup.number().required('Status is required')
})

const SellerSignUp = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  const [sellerImage, setSellerImage] = useState([])
  const [shopLogo, setShopLogo] = useState([])
  const [shopBanner, setShopBanner] = useState([])
  const getSellerByIdData = useSelector(store => store.getSellerById?.data?.data)
  console.log('getSellerByIdData', getSellerByIdData)

  const {
    setValue,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: '',
      mobile_no: '',
      email: '',
      password: '',
      shop_name: '',
      shop_address: '',
      seller_image: [],
      shop_logo: [],
      shop_banner: [],
      is_active: 0
    }
  })

  const onSubmit = data => {
    const formData = new FormData()
    formData.append('name', data?.name)
    formData.append('mobile_no', data?.mobile_no)
    formData.append('email', data?.email)
    formData.append('password', data?.password)
    formData.append('shop_name', data?.shop_name)
    formData.append('shop_address', data?.shop_address)
    formData.append('seller_image', data?.seller_image?.[0])
    formData.append('shop_logo', data?.shop_logo?.[0])
    formData.append('shop_banner', data?.shop_banner?.[0])
    formData.append('is_active', data?.is_active)

    const extra = () => {
      reset()
      router.push('/login')
    }

    if (id) {
      formData.append('seller_id', getSellerByIdData?.id)

      dispatch(addSeller('update-seller', formData, extra))
    } else {
      dispatch(addSeller('add-seller', formData, extra))
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* <Grid container spacing={6} alignItems={'center'} display={'flex'}>
        <Grid item xs={12} md={6}>
          <PageHeader title={<Typography variant='h4'>{id ? 'Update' : 'Add New'} Seller</Typography>} />
        </Grid>
        <Grid item xs={12} md={6} textAlign={'right'}>
          <Button variant='tonal' color='secondary'>
            Discard
          </Button>
          <Button variant='contained' type='submit' style={{ marginLeft: '15px' }}>
            {id ? 'Update' : 'Add'} Seller
          </Button>
        </Grid>
      </Grid> */}

      <Grid container spacing={6} width={'80%'} margin={'auto'}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardHeader title='Seller Signup' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Name'
                        placeholder='Saller Name'
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='email'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        type='email'
                        label='Email'
                        placeholder='email address'
                        {...field}
                        error={Boolean(errors.email)}
                        helperText={errors.email?.message}
                      />
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Controller
                    name='mobile_no'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Mobile No.'
                        placeholder='Mobile No.'
                        error={Boolean(errors.mobile_no)}
                        helperText={errors.mobile_no?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='password'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Password'
                        type='password'
                        placeholder='Password'
                        error={Boolean(errors.password)}
                        helperText={errors.password?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='shop_name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Shop Name'
                        placeholder='Shop Name'
                        error={Boolean(errors.shop_name)}
                        helperText={errors.shop_name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='is_active'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Status'
                        defaultValue=''
                        error={Boolean(errors.is_active)}
                        helperText={errors.is_active?.message}
                      >
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={12}>
                  <Controller
                    name='shop_address'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        rows={5}
                        multiline
                        label='Shop Address'
                        placeholder='Shop Address'
                        error={Boolean(errors.shop_address)}
                        helperText={errors.shop_address?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Seller Image' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box mb={4}>
                    <Controller
                      name='seller_image'
                      control={control}
                      render={({ field }) => (
                        <FileUploaderRestrictions
                          maxFiles={1}
                          files={sellerImage}
                          setFiles={acceptedFiles => {
                            setSellerImage(acceptedFiles)
                            setValue('seller_image', acceptedFiles)
                          }}
                          error={errors.seller_image || ''}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Shop Logo' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box mb={4}>
                    <Controller
                      name='shop_logo'
                      control={control}
                      render={({ field }) => (
                        <FileUploaderRestrictions
                          maxFiles={1}
                          files={shopLogo}
                          setFiles={acceptedFiles => {
                            setShopLogo(acceptedFiles)
                            setValue('shop_logo', acceptedFiles)
                          }}
                          error={errors.shop_logo || ''}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Shop Banner' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box mb={4}>
                    <Controller
                      name='shop_banner'
                      control={control}
                      render={({ field }) => (
                        <FileUploaderRestrictions
                          maxFiles={1}
                          files={shopBanner}
                          setFiles={acceptedFiles => {
                            setShopBanner(acceptedFiles)
                            setValue('shop_banner', acceptedFiles)
                          }}
                          error={errors.shop_banner || ''}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid container spacing={6} mt={4} mb={5}>
          <Grid item xs={12} md={12} textAlign={'center'}>
            <Button variant='tonal' color='secondary' onClick={() => router.push('/login')}>
              back
            </Button>
            <Button variant='contained' type='submit' style={{ marginLeft: '15px' }}>
              Signup as Seller
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}

SellerSignUp.getLayout = page => <BlankLayout>{page}</BlankLayout>
SellerSignUp.guestGuard = true

export default SellerSignUp
