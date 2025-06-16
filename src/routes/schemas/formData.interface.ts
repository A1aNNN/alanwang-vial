export interface IQuery {
  id: string
  title: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
  status: string
}

export interface IFormData {
  id: string
  question: string
  answer: string
  queries: IQuery[]
}

export interface ICountedFormData {
  total: number
  formData: IFormData[]
}
