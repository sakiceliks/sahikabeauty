import { GET, POST } from '@/app/api/services/route'
import { NextRequest } from 'next/server'

// Mock MongoDB
const mockCollection = {
  find: jest.fn(() => ({
    sort: jest.fn(() => ({
      toArray: jest.fn()
    }))
  })),
  insertOne: jest.fn(),
  findOne: jest.fn(),
  updateOne: jest.fn(),
  deleteOne: jest.fn()
}

const mockDb = {
  collection: jest.fn(() => mockCollection)
}

const mockClient = {
  db: jest.fn(() => mockDb)
}

jest.mock('../../lib/mongodb', () => ({
  __esModule: true,
  default: jest.fn(() => mockClient)
}))

describe('/api/services', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all services', async () => {
      const mockServices = [
        { _id: '1', name: 'Service 1', slug: 'service-1' },
        { _id: '2', name: 'Service 2', slug: 'service-2' }
      ]
      mockCollection.find().sort().toArray.mockResolvedValue(mockServices)

      const request = new NextRequest('http://localhost:3000/api/services')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockServices)
      expect(mockCollection.find).toHaveBeenCalledWith({ published: true })
    })

    it('should handle database errors', async () => {
      mockCollection.find().sort().toArray.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/services')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })

  describe('POST', () => {
    it('should create new service', async () => {
      const serviceData = {
        name: 'Test Service',
        slug: 'test-service',
        description: 'Test description',
        price: 100,
        duration: 60,
        published: true
      }

      mockCollection.insertOne.mockResolvedValue({ insertedId: 'new-id' })

      const request = new NextRequest('http://localhost:3000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockCollection.insertOne).toHaveBeenCalledWith(
        expect.objectContaining(serviceData)
      )
    })

    it('should return error for missing required fields', async () => {
      const incompleteData = {
        name: 'Test Service'
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incompleteData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toContain('gerekli')
    })

    it('should handle database errors on create', async () => {
      const serviceData = {
        name: 'Test Service',
        slug: 'test-service',
        description: 'Test description',
        price: 100,
        duration: 60,
        published: true
      }

      mockCollection.insertOne.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })
})
