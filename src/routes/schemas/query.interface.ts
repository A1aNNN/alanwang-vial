export interface ICreateQueryRequest {
  title: string
  description?: string | null
  formDataId: string
}

export type QueryStatus = 'OPEN' | 'RESOLVED'

export interface IQueryResponse {
  id: string
  title: string
  description?: string | null
  createdAt: Date
  updatedAt: Date
  status: QueryStatus
  formDataId: string
}

export interface IUpdateQueryRequest {
  status: 'RESOLVED'
}
