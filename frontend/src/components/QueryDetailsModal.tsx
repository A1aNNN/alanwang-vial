import React, { useState } from 'react'
import { FormData } from '../types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  HStack,
  Badge,
  Icon,
  useToast,
} from '@chakra-ui/react'
import { QuestionIcon, CheckIcon } from '@chakra-ui/icons'

interface QueryDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  formData: FormData
  onQueryUpdated: () => void
}

const QueryDetailsModal: React.FC<QueryDetailsModalProps> = ({
  isOpen,
  onClose,
  formData,
  onQueryUpdated,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const query = formData.queries[0]
  const toast = useToast()

  const handleResolve = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch(
        `http://localhost:8080/queries/${query.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: 'RESOLVED',
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Failed to resolve query')
      }

      toast({
        title: 'Query resolved',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onQueryUpdated()
    } catch (error) {
      console.error('Error:', error)
      toast({
        title: 'Error',
        description: 'Something went wrong',
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Query Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <VStack spacing={4} align="stretch">
            <Text fontWeight="medium">Question: {formData.question}</Text>
            <Text fontWeight="medium">Answer: {formData.answer}</Text>

            <HStack>
              <Text fontWeight="medium">Status:</Text>
              <Badge
                colorScheme={query.status === 'OPEN' ? 'red' : 'green'}
                display="flex"
                alignItems="center"
                gap={1}
              >
                <Icon
                  as={query.status === 'OPEN' ? QuestionIcon : CheckIcon}
                  boxSize={3}
                />
                {query.status}
              </Badge>
            </HStack>

            <Text fontWeight="medium">Description:</Text>
            <Text>{query.description}</Text>

            <Text fontSize="sm" color="#666666">
              Created: {new Date(query.createdAt).toLocaleString()}
            </Text>
            <Text fontSize="sm" color="#666666">
              Last Updated: {new Date(query.updatedAt).toLocaleString()}
            </Text>

            {query.status === 'OPEN' && (
              <Button
                colorScheme="green"
                onClick={handleResolve}
                isLoading={isSubmitting}
                width="full"
              >
                Resolve Query
              </Button>
            )}
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default QueryDetailsModal
