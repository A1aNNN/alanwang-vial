export interface Query {
  id: string
  title: string
  description?: string
  createdAt: Date
  updatedAt: Date
  status: 'OPEN' | 'RESOLVED'
  formDataId: string
}

export interface FormData {
  id: string
  question: string
  answer: string
  queries: Query[]
}

export interface FormDataResponse {
  total: number
  formData: FormData[]
}

export interface CreateQueryRequest {
  title: string
  description?: string
  formDataId: string
}

export interface UpdateQueryRequest {
  status: 'RESOLVED'
}
