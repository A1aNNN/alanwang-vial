import { FastifyInstance } from 'fastify'
import prisma from '../db/db_client'
import { serializer } from './middleware/pre_serializer'
import { ApiError } from '../errors'
import {
  ICreateQueryRequest,
  IQueryResponse,
  IUpdateQueryRequest,
} from './schemas/query.interface'

async function queryRoutes(app: FastifyInstance) {
  app.setReplySerializer(serializer)

  const log = app.log.child({ component: 'queryRoutes' })

  //Endpoint 2: Create a new query
  app.post<{
    Body: ICreateQueryRequest
    Reply: IQueryResponse
  }>('', {
    handler: async (req, reply) => {
      log.debug('create query')
      try {
        const { title, description, formDataId } = req.body

        const formData = await prisma.formData.findUnique({
          where: { id: formDataId },
        })

        if (!formData) {
          throw new ApiError('Form data not found', 404)
        }

        const query = await prisma.query.create({
          data: {
            title,
            description,
            status: 'OPEN',
            formDataId,
          },
        })

        reply.code(201).send(query)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('Failed to create query', 400)
      }
    },
  })

  //Endpoint 3: Update an existing query
  app.put<{
    Params: { id: string }
    Body: IUpdateQueryRequest
    Reply: IQueryResponse
  }>('/:id', {
    handler: async (req, reply) => {
      log.debug('update query')
      try {
        const { id } = req.params
        const { description, status } = req.body

        const query = await prisma.query.update({
          where: { id },
          data: {
            description,
            status,
            updatedAt: new Date(),
          },
        })

        reply.send(query)
      } catch (err: any) {
        log.error({ err }, err.message)
        throw new ApiError('Failed to update query', 400)
      }
    },
  })
}

export default queryRoutes
