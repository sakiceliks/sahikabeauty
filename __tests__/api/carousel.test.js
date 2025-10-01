import { GET, POST } from '@/app/api/carousel/route'
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

describe('/api/carousel', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all carousel slides', async () => {
      const mockSlides = [
        { _id: '1', title: 'Slide 1', image: 'image1.jpg', order: 1 },
        { _id: '2', title: 'Slide 2', image: 'image2.jpg', order: 2 }
      ]
      mockCollection.find().sort().toArray.mockResolvedValue(mockSlides)

      const request = new NextRequest('http://localhost:3000/api/carousel')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockSlides)
      expect(mockCollection.find).toHaveBeenCalledWith({})
    })

    it('should handle database errors', async () => {
      mockCollection.find().sort().toArray.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/carousel')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })

  describe('POST', () => {
    it('should create new carousel slide', async () => {
      const slideData = {
        title: 'Test Slide',
        image: 'test-image.jpg',
        description: 'Test description',
        order: 1,
        active: true
      }

      mockCollection.insertOne.mockResolvedValue({ insertedId: 'new-id' })

      const request = new NextRequest('http://localhost:3000/api/carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockCollection.insertOne).toHaveBeenCalledWith(
        expect.objectContaining(slideData)
      )
    })

    it('should return error for missing required fields', async () => {
      const incompleteData = {
        title: 'Test Slide'
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3000/api/carousel', {
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
      const slideData = {
        title: 'Test Slide',
        image: 'test-image.jpg',
        description: 'Test description',
        order: 1,
        active: true
      }

      mockCollection.insertOne.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/carousel', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slideData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })
})
