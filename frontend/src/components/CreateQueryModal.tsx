import React, { useState } from 'react'
import { FormData } from '../types'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Text,
  useToast,
} from '@chakra-ui/react'

interface CreateQueryModalProps {
  isOpen: boolean
  onClose: () => void
  formData: FormData
  onQueryCreated: () => void
}

const CreateQueryModal: React.FC<CreateQueryModalProps> = ({
  isOpen,
  onClose,
  formData,
  onQueryCreated,
}) => {
  const [description, setDescription] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('http://localhost:8080/queries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: formData.question,
          description,
          formDataId: formData.id,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create query')
      }

      toast({
        title: 'Success',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      onQueryCreated()
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
        <ModalHeader>Create Query</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Text fontWeight="medium">Question: {formData.question}</Text>
              <FormControl isRequired>
                <FormLabel>Description</FormLabel>
                <Input
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Enter query description"
                />
              </FormControl>
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={isSubmitting}
                width="full"
              >
                Create Query
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreateQueryModal
