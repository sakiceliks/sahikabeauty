import { GET } from '@/app/api/categories/route'
import { NextRequest } from 'next/server'

// Mock MongoDB
const mockCollection = {
  find: jest.fn(() => ({
    sort: jest.fn(() => ({
      toArray: jest.fn()
    }))
  }))
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

describe('/api/categories', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all categories', async () => {
      const mockCategories = [
        { _id: '1', name: 'Category 1', slug: 'category-1' },
        { _id: '2', name: 'Category 2', slug: 'category-2' }
      ]
      mockCollection.find().sort().toArray.mockResolvedValue(mockCategories)

      const request = new NextRequest('http://localhost:3000/api/categories')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockCategories)
      expect(mockCollection.find).toHaveBeenCalledWith({})
    })

    it('should handle database errors', async () => {
      mockCollection.find().sort().toArray.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/categories')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })

    it('should return empty array when no categories found', async () => {
      mockCollection.find().sort().toArray.mockResolvedValue([])

      const request = new NextRequest('http://localhost:3000/api/categories')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual([])
    })
  })
})
