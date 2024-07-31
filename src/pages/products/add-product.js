import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Typography
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import FileUploaderRestrictions from 'src/@core/components/FileUploaderRestrictions/FileUploaderRestrictions'
import TagInput from 'src/@core/components/TagInput/TagInput'
import CustomRadioIcons from 'src/@core/components/custom-radio/icons'
import EditorControlled from 'src/@core/components/editor'
import CustomTextField from 'src/@core/components/mui/text-field'
import PageHeader from 'src/@core/components/page-header'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { getCode } from 'src/network/actions/getCode'
import { useDispatch, useSelector } from 'react-redux'
import { getCategoryList } from 'src/network/actions/getCategoryList'
import { getSubCategoryList } from 'src/network/actions/getSubCategoryList'
import { ContentState, EditorState, convertFromHTML } from 'draft-js'
import { getUnit } from 'src/network/actions/getUnit'
import { Router, useRouter } from 'next/router'
import { addProduct } from 'src/network/actions/addProduct'
import { getProductById } from 'src/network/actions/getProductById'
import { stateToHTML } from 'draft-js-export-html'

// Define the validation schema
const schema = yup.object().shape({
  name: yup.string().required('Product name is required'),
  quantity: yup
    .number()
    .typeError('Quantity must be a number')
    .required('Quantity is required')
    .positive('Quantity must be a positive number'),
  maxOrderQuantity: yup
    .number()
    .typeError('Max. order quantity must be a number')
    .required('Max order quantity is required')
    .positive('Max order quantity must be a positive number'),

  // discount: yup.boolean().required('Discount availability is required'),

  basePrice: yup
    .number()
    .typeError('Price must be a number')
    .required('Base price is required')
    .positive('Base price must be a positive number'),
  purchasePrice: yup
    .number()
    .typeError('Price must be a number')
    .required('Base price is required')
    .positive('Base price must be a positive number'),
  discountedPrice: yup.number().typeError('Discount price must be a number').required('Discounted price is required'),
  discountedPercentage: yup
    .number()
    .typeError('Discount percetage must be a number')
    .required('Discounted percentage is required'),

  shippingCharge: yup.number().typeError('Shipping charge must be a number').required('Shipping charge is required'),
  category: yup.string().required('Category is required'),

  // subCategory: yup.string().required('Sub Category is required'),
  status: yup.string().required('Status is required'),

  // stock: yup.string().required('Stock status is required'),
  unit: yup.string().required('Unit is required'),
  files: yup.array().min(1, 'At least one file is required'),
  media: yup.array().min(1, 'At least one file is required')
})

const AddProduct = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { id } = router.query
  console.log('id router', id)

  const getCodeData = useSelector(store => store?.getCode?.data)
  const getCategoryListData = useSelector(store => store?.getCategoryList?.data)
  const getSubCategoryListData = useSelector(store => store?.getSubCategoryList?.data)
  const getProductByIdData = useSelector(store => store?.getProductById?.data?.data)
  const getUnitList = useSelector(store => store?.getUnit?.data)
  console.log('getProductByIdData', getProductByIdData)

  const [selectedRadio, setSelectedRadio] = useState('percentage')
  const [files, setFiles] = useState([])
  const [media, setMedia] = useState([])
  const [details, setDetails] = useState(EditorState.createEmpty())

  // const [type, setType] = useState()

  const [variants, setVariants] = useState([
    {
      option: '',
      value: []
    }
  ])

  console.log('variants', variants)

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
      quantity: '',
      maxOrderQuantity: '',
      basePrice: '',
      purchasePrice: '',
      unit: '',
      refundable: true,
      code: '',
      checkbox: false,
      product_type: '',
      discountedPrice: 0,
      discountedPercentage: 0,
      shippingCharge: '',
      tax: '',
      taxType: '',
      category: '',
      subCategory: '',
      status: '',
      stock: '',
      files: [],
      media: []
    }
  })

  console.log('abc', errors)

  useEffect(() => {
    dispatch(getCode())
    dispatch(getCategoryList())
    dispatch(getSubCategoryList())
    dispatch(getUnit())
  }, [dispatch])

  const convertObjectToArray = obj => {
    return Object.keys(obj).map(key => ({
      option: key,
      value: obj[key]
    }))
  }

  useEffect(() => {
    if (getProductByIdData && id) {
      setValue('name', getProductByIdData?.name)
      setValue('code', getProductByIdData?.code)
      setValue('user_id', getProductByIdData?.user_id)
      setValue('product_type', getProductByIdData?.product_type)
      setValue('category', getProductByIdData?.category_id)
      setValue('unit', getProductByIdData?.unit)
      setValue('quantity', getProductByIdData?.min_qty)
      setValue('refundable', getProductByIdData?.refundable == 0 ? true : false)

      // setValue('variants', ) //
      setValue('basePrice', getProductByIdData?.unit_price)
      setValue('purchasePrice', getProductByIdData?.purchase_price)
      setValue('tax', getProductByIdData?.tax)
      setValue('tax_type', 'gst')
      setValue('maxOrderQuantity', getProductByIdData?.minimum_order_qty)
      setValue('files', [getProductByIdData?.thumbnail])
      setValue('media', getProductByIdData?.img)
      setValue('discountedPrice', getProductByIdData?.discount)
      setValue('discountedPercentage', getProductByIdData?.discount)
      setValue('discount_type', selectedRadio)
      setValue('status', getProductByIdData?.status)
      setValue('shippingCharge', getProductByIdData?.shipping_cost)
      const defaultText = JSON.parse(getProductByIdData?.details)
      const blocksFromHTML = convertFromHTML(defaultText?.content)
      const contentState = ContentState.createFromBlockArray(blocksFromHTML.contentBlocks, blocksFromHTML.entityMap)
      const stateWithContent = EditorState.createWithContent(contentState)
      setDetails(stateWithContent)
      setVariants(convertObjectToArray(JSON.parse(getProductByIdData?.attributes)))
    }
  }, [getProductByIdData])

  useEffect(() => {
    if (getCodeData && !id) {
      setValue('code', getCodeData)
    }
  }, [getCodeData])
  useEffect(() => {
    if (id) {
      dispatch(getProductById({ product_id: id }))
    }
  }, [id])

  const addVariant = () => {
    setVariants([
      ...variants,
      {
        option: '',
        value: []
      }
    ])
  }

  const deleteVariant = index => {
    let data = [...variants]
    let newData = data.filter((_, i) => i !== index)
    setVariants(newData)
  }

  const data = [
    {
      value: 'percentage',
      title: (
        <Typography variant='h6' sx={{ mb: 1 }}>
          Percentage %
        </Typography>
      )
    },
    {
      value: 'fixed',
      title: (
        <Typography variant='h6' sx={{ mb: 1 }}>
          Fixed Price
        </Typography>
      )
    }
  ]

  const handleRadioChange = prop => {
    if (typeof prop === 'string') {
      setSelectedRadio(prop)
    } else {
      setSelectedRadio(prop.target.value)
    }
  }

  const onSubmit = data => {
    console.log('abc', data)
    let result = {}
    variants?.forEach(item => {
      result[item.option] = item.value
    })
    console.log('result', result)
    const formData = new FormData()
    formData.append('name', data?.name)
    formData.append('user_id', 7)
    formData.append('product_type', data?.product_type)
    formData.append('category_id', data?.category)
    formData.append('unit', data?.unit)
    formData.append('min_qty', data?.quantity)
    formData.append('refundable', data?.refundable)
    formData.append('attributes', JSON.stringify(result)) //
    formData.append('unit_price', data?.basePrice)
    formData.append('purchase_price', data?.purchasePrice)
    formData.append('tax', data?.tax)
    formData.append('tax_type', 'gst')
    formData.append('minimum_order_qty', data?.maxOrderQuantity)
    formData.append('thumbnail', data?.files?.[0])
    formData.append('img', data?.media)
    formData.append('discount', selectedRadio == 'fixed' ? data?.discountedPrice : data?.discountedPercentage)
    formData.append('discount_type', selectedRadio)
    formData.append('status', data?.status)
    formData.append('shipping_cost', data?.shippingCharge)
    const contentState = details.getCurrentContent()
    const html = stateToHTML(contentState)
    formData.append('details', JSON.stringify({ content: html }))

    const extra = () => {
      router.push('/products')
      reset()
    }

    if (id) {
      formData.append('product_id', getProductByIdData?.id)

      dispatch(addProduct('/update-product', formData, extra))
    } else {
      formData.append('code', data?.code)

      dispatch(addProduct('/add-product', formData, extra))
    }
  }

  const handleVariantChange = (e, index) => {
    let data = [...variants]
    let newData = data?.map((v, i) => (i == index ? { ...v, option: e.target.value } : v))
    setVariants(newData)
  }

  const handleVariantChangeValue = (e, index) => {
    let data = [...variants]
    let newData = data?.map((v, i) => (i == index ? { ...v, value: e } : v))
    setVariants(newData)
  }
  const watchDiscount = watch('checkbox', false)

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <PageHeader
            title={
              <Typography variant='h4' sx={{ mb: 6 }}>
                Add a new Product
              </Typography>
            }
          />
        </Grid>
        <Grid item xs={12} md={6} textAlign={'right'}>
          <Button variant='tonal' color='secondary'>
            Discard
          </Button>
          <Button variant='tonal' style={{ margin: '0 15px' }}>
            Save Draft
          </Button>
          <Button variant='contained' type='submit'>
            Publish Product
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={6} mt={0}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title='Product information' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Controller
                    name='name'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        label='Name'
                        placeholder='Product title'
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='code'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        fullWidth
                        type='number'
                        label='SKU'
                        placeholder='SKU'
                        disabled
                        {...field}
                        error={Boolean(errors.name)}
                        helperText={errors.name?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='refundable'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Refundable'
                        defaultValue=''
                        error={Boolean(errors.refundable)}
                        helperText={errors.refundable?.message}
                      >
                        {/* <MenuItem value=''>
                          <em>None</em>
                        </MenuItem> */}
                        <MenuItem value={true}>Yes</MenuItem>
                        <MenuItem value={false}>No</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='product_type'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Product type'
                        defaultValue=''
                        error={Boolean(errors.product_type)}
                        helperText={errors.product_type?.message}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='Physical'>Physical</MenuItem>
                        <MenuItem value='Digital'>Digital</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='unit'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Select Unit'
                        defaultValue=''
                        error={Boolean(errors.unit)}
                        helperText={errors.unit?.message}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {getUnitList?.map((v, i) => (
                          <MenuItem value={v?.unit} key={i}>
                            {v?.unit}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>

                <Grid item xs={12} md={4}>
                  <Controller
                    name='quantity'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Quantity'
                        placeholder='Quantity'
                        error={Boolean(errors.quantity)}
                        helperText={errors.quantity?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Controller
                    name='maxOrderQuantity'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Max. Order Quantity'
                        placeholder='Max. Quantity'
                        error={Boolean(errors.maxOrderQuantity)}
                        helperText={errors.maxOrderQuantity?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputLabel>Description (Optional)</InputLabel>
                  <EditorControlled value={details} setValue={setDetails} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Media' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Box mb={4}>
                    <Controller
                      name='media'
                      control={control}
                      render={({ field }) => (
                        <FileUploaderRestrictions
                          maxFiles={1}
                          files={media}
                          setFiles={acceptedFiles => {
                            setMedia(acceptedFiles)
                            setValue('media', acceptedFiles)
                          }}
                          error={errors.media || ''}
                        />
                      )}
                    />
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Variations' />
            <CardContent>
              {variants.map((v, i) => (
                <Grid container spacing={6} key={i} mb={3}>
                  <Grid item xs={12} md={4.5}>
                    <CustomTextField
                      select
                      defaultValue=''
                      label='Options'
                      id='custom-select'
                      fullWidth
                      onChange={e => handleVariantChange(e, i)}
                      value={v.option}
                    >
                      <MenuItem value='color'>Color</MenuItem>
                      <MenuItem value='size'>Size</MenuItem>
                    </CustomTextField>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormLabel>Values</FormLabel>
                    <TagInput initialTags={v?.value} onChange={e => handleVariantChangeValue(e, i)} />
                  </Grid>
                  <Grid item xs={12} md={1.5} mt={4}>
                    <Button variant='tonal' color='error' onClick={() => deleteVariant(i)}>
                      <DeleteForeverIcon />
                    </Button>
                  </Grid>
                </Grid>
              ))}

              <Button variant='contained' style={{ marginTop: '15px' }} onClick={addVariant}>
                Add another option
              </Button>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title='Thumbnail' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
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
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Pricing' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Controller
                    name='purchasePrice'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Purchase Price'
                        placeholder='Product Price'
                        error={Boolean(errors.purchasePrice)}
                        helperText={errors.purchasePrice?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='basePrice'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Base Price'
                        placeholder='Product Price'
                        error={Boolean(errors.basePrice)}
                        helperText={errors.basePrice?.message}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl>
                    <Controller
                      name='checkbox'
                      control={control}
                      rules={{ required: true }}
                      render={({ field }) => (
                        <FormControlLabel
                          label='Discount available on this product'
                          sx={errors.checkbox ? { color: 'error.main' } : null}
                          control={
                            <Checkbox
                              {...field}
                              name='validation-basic-checkbox'
                              sx={errors.checkbox ? { color: 'error.main' } : null}
                            />
                          }
                        />
                      )}
                    />
                  </FormControl>
                  {/* {errors.discount && <Typography color='error'>{errors.discount.message}</Typography>} */}
                </Grid>
                {watchDiscount && (
                  <>
                    <Grid item xs={12}>
                      <Grid container spacing={4}>
                        {data.map((item, index) => (
                          <CustomRadioIcons
                            key={index}
                            data={data[index]}
                            selected={selectedRadio}
                            name='custom-radios-deal'
                            gridProps={{ sm: 6, xs: 12 }}
                            handleChange={handleRadioChange}
                          />
                        ))}
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      {selectedRadio === 'fixed' ? (
                        <Controller
                          name='discountedPrice'
                          control={control}
                          render={({ field }) => (
                            <CustomTextField
                              {...field}
                              fullWidth
                              type='number'
                              label='Discounted Price'
                              placeholder='Discounted Price'
                              error={Boolean(errors.discountedPrice)}
                              helperText={errors.discountedPrice?.message}
                            />
                          )}
                        />
                      ) : selectedRadio === 'percentage' ? (
                        <Controller
                          name='discountedPercentage'
                          control={control}
                          render={({ field }) => (
                            <CustomTextField
                              {...field}
                              fullWidth
                              type='number'
                              label='Discounted Percentage'
                              placeholder='Discounted Percentage'
                              error={Boolean(errors.discountedPercentage)}
                              helperText={errors.discountedPercentage?.message}
                            />
                          )}
                        />
                      ) : null}
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <Controller
                    name='shippingCharge'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Shipping Charge'
                        placeholder='Shipping Charge'
                        error={Boolean(errors.shippingCharge)}
                        helperText={errors.shippingCharge?.message}
                      />
                    )}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Controller
                    name='taxType'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Tax Type'
                        defaultValue=''
                        error={Boolean(errors.taxType)}
                        helperText={errors.taxType?.message}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='gst'>GST</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Controller
                    name='tax'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        fullWidth
                        type='number'
                        label='Tax'
                        placeholder='Enter tax amount'
                        error={Boolean(errors.tax)}
                        helperText={errors.tax?.message}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          <Card style={{ marginTop: '30px' }}>
            <CardHeader title='Organize' />
            <CardContent>
              <Grid container spacing={6}>
                <Grid item xs={12}>
                  <Controller
                    name='category'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Category'
                        defaultValue=''
                        error={Boolean(errors.category)}
                        helperText={errors.category?.message}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {getCategoryListData?.map(v => (
                          <MenuItem value={v?.id} key={v?.id}>
                            {v?.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Controller
                    name='subCategory'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Sub Category'
                        defaultValue=''
                        error={Boolean(errors.subCategory)}
                        helperText={errors.subCategory?.message}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        {getSubCategoryListData?.map(v => (
                          <MenuItem value={v?.id} key={v?.id}>
                            {v?.name}
                          </MenuItem>
                        ))}
                      </CustomTextField>
                    )}
                  />
                </Grid> */}
                <Grid item xs={12}>
                  <Controller
                    name='status'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Status'
                        defaultValue=''
                        error={Boolean(errors.status)}
                        helperText={errors.status?.message}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value={1}>Active</MenuItem>
                        <MenuItem value={0}>Inactive</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid>
                {/* <Grid item xs={12}>
                  <Controller
                    name='stock'
                    control={control}
                    render={({ field }) => (
                      <CustomTextField
                        {...field}
                        select
                        fullWidth
                        label='Stock'
                        defaultValue=''
                        error={Boolean(errors.stock)}
                        helperText={errors.stock?.message}
                      >
                        <MenuItem value=''>
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value='inStock'>In Stock</MenuItem>
                        <MenuItem value='outOfStock'>Out of Stock</MenuItem>
                      </CustomTextField>
                    )}
                  />
                </Grid> */}
                {/* <Grid item xs={12}>
                  <FormLabel>Tags</FormLabel>
                  <TagInput initialTags={tags} onChange={handleTagChange} />
                </Grid> */}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </form>
  )
}

export default AddProduct
