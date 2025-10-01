import { GET, POST } from '@/app/api/testimonial/route'
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

describe('/api/testimonial', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all testimonials', async () => {
      const mockTestimonials = [
        { _id: '1', name: 'John Doe', comment: 'Great service!', rating: 5 },
        { _id: '2', name: 'Jane Doe', comment: 'Excellent work!', rating: 5 }
      ]
      mockCollection.find().sort().toArray.mockResolvedValue(mockTestimonials)

      const request = new NextRequest('http://localhost:3000/api/testimonial')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockTestimonials)
      expect(mockCollection.find).toHaveBeenCalledWith({ approved: true })
    })

    it('should handle database errors', async () => {
      mockCollection.find().sort().toArray.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/testimonial')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })

  describe('POST', () => {
    it('should create new testimonial', async () => {
      const testimonialData = {
        name: 'John Doe',
        comment: 'Great service!',
        rating: 5,
        approved: false
      }

      mockCollection.insertOne.mockResolvedValue({ insertedId: 'new-id' })

      const request = new NextRequest('http://localhost:3000/api/testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockCollection.insertOne).toHaveBeenCalledWith(
        expect.objectContaining(testimonialData)
      )
    })

    it('should return error for missing required fields', async () => {
      const incompleteData = {
        name: 'John Doe'
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3000/api/testimonial', {
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
      const testimonialData = {
        name: 'John Doe',
        comment: 'Great service!',
        rating: 5,
        approved: false
      }

      mockCollection.insertOne.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/testimonial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testimonialData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })
})
