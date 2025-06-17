import React, { useState, useEffect } from 'react'
import { ChakraProvider, Container, Heading } from '@chakra-ui/react'
import FormDataTable from './components/FormDataTable'
import { FormData } from './types'

function App() {
  const [formData, setFormData] = useState<FormData[]>([])

  const fetchFormData = async () => {
    try {
      const response = await fetch('http://localhost:8080/form-data')
      const result = await response.json()
      if (result.statusCode === 200 && result.data) {
        setFormData(result.data.formData)
      } else {
        console.error('Error in API response:', result)
      }
    } catch (error) {
      console.error('Error fetching form data:', error)
    }
  }

  useEffect(() => {
    fetchFormData()
  }, [])

  return (
    <ChakraProvider>
      <Container maxWidth="1200px" padding="32px 0">
        <Heading marginBottom="24px">Query Management</Heading>
        <FormDataTable
          formData={formData}
          onQueryCreated={fetchFormData}
          onQueryUpdated={fetchFormData}
        />
      </Container>
    </ChakraProvider>
  )
}

export default App
