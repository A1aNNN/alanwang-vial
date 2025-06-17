import {
  FormDataResponse,
  CreateQueryRequest,
  UpdateQueryRequest,
  Query,
} from '../types'

const API_BASE_URL = 'http://localhost:8080'

export const fetchFormData = async (): Promise<FormDataResponse> => {
  const response = await fetch(`${API_BASE_URL}/form-data`)
  if (!response.ok) {
    throw new Error('Failed to fetch form data')
  }
  const data = await response.json()
  return data.data
}

export const createQuery = async (
  query: CreateQueryRequest
): Promise<Query> => {
  const response = await fetch(`${API_BASE_URL}/queries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  })
  if (!response.ok) {
    throw new Error('Failed to create query')
  }
  const data = await response.json()
  return data.data
}

export const updateQuery = async (
  id: string,
  query: UpdateQueryRequest
): Promise<Query> => {
  const response = await fetch(`${API_BASE_URL}/queries/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query),
  })
  if (!response.ok) {
    throw new Error('Failed to update query')
  }
  const data = await response.json()
  return data.data
}

export const deleteQuery = async (id: string): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/queries/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Failed to delete query')
  }
}
