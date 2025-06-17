import React from 'react'
import { FormData } from '../types'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Icon,
  Box,
} from '@chakra-ui/react'
import { AddIcon, QuestionIcon, CheckIcon } from '@chakra-ui/icons'

interface FormDataTableProps {
  formData: FormData[]
  onQueryCreated: () => void
  onQueryUpdated: () => void
}

const FormDataTable: React.FC<FormDataTableProps> = ({ formData }) => {
  const handleCreateQuery = (formData: FormData) => {
    //todo
  }

  const handleViewQuery = (formData: FormData) => {
    //todo
  }

  const getQueryStatusIcon = (status: string) => {
    switch (status) {
      case 'OPEN':
        return <Icon as={QuestionIcon} color="red" />
      case 'RESOLVED':
        return <Icon as={CheckIcon} color="green" />
      default:
        return null
    }
  }

  return (
    <Box overflowX="auto">
      <Table>
        <Thead>
          <Tr>
            <Th>Question</Th>
            <Th>Answer</Th>
            <Th>Queries</Th>
          </Tr>
        </Thead>
        <Tbody>
          {formData.map(data => (
            <Tr key={data.id}>
              <Td>{data.question}</Td>
              <Td>{data.answer}</Td>
              <Td>
                {data.queries.length > 0 ? (
                  <Button
                    size="sm"
                    colorScheme={
                      data.queries[0].status === 'OPEN' ? 'red' : 'green'
                    }
                    variant="outline"
                    onClick={() => handleViewQuery(data)}
                  >
                    {getQueryStatusIcon(data.queries[0].status)}
                    {data.queries[0].status}
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    colorScheme="blue"
                    variant="outline"
                    onClick={() => handleCreateQuery(data)}
                    title="Create Query"
                  >
                    <Icon as={AddIcon} />
                    Create Query
                  </Button>
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  )
}

export default FormDataTable
