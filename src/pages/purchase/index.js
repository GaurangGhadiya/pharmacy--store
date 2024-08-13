import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { Card, Grid } from '@mui/material'
import Step1 from './Step1'
import Step2 from './Step2'

const steps = ['Direct Recive', 'Add Medicines']

const Purchase = () => {
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [list, setList] = useState([])
  const [isEditMode, setisEditMode] = useState(false)

  console.log('list', list)

  const addDrug = () => {
    if (isEditMode) {
      let data = [...list]
      setisEditMode(false)
      let newData = data?.map(v => (v.id == formData.id ? { ...formData } : v))
      setList(newData)
    } else {
      setList([...list, { ...formData, id: +Math.floor(Math.random() * 100) + 1 }])
    }

    setFormData({
      description: '',
      unit: '',
      brandName: '',
      mfgBy: '',
      batchNumber: '',
      expMonth: '',
      expYear: '',
      unitPrice: '',
      taxOn: '',
      taxName: '',
      totalTax: '',
      purchasePrice: '',
      sellingPrice: ''
    })
  }

  const handleDelete = index => {
    console.log('delete', index)
    let data = [...list]
    let newData = data.filter((v, i) => v.id != index)
    setList(newData)
  }

  console.log('formData', formData)

  const handleChange = (e, isDate = false) => {
    if (typeof isDate == 'string') {
      console.log('asdads', isDate, e)
      setFormData({ ...formData, [isDate]: e })
    } else {
      const { name, value } = e.target
      console.log(name, value)
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleNext = () => {
    setActiveStep(1)
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card style={{ padding: '20px' }}>
          <Box sx={{ width: '80%', marginBottom: '20px', margin: 'auto' }}>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
          {activeStep == 0 && (
            <Step1 handleNext={handleNext} formData={formData} setFormData={setFormData} handleChange={handleChange} />
          )}
          {activeStep == 1 && (
            <Step2
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
              addDrug={addDrug}
              list={list}
              handleDelete={handleDelete}
              setisEditMode={setisEditMode}
            />
          )}
        </Card>
      </Grid>
    </Grid>
  )
}

export default Purchase
