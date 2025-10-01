const { GET, PUT, DELETE } = require('@/app/api/contact/[id]/route')
const { ObjectId } = require('mongodb')

// MongoDB mock
const mockCollection = {
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

jest.mock('@/lib/mongodb', () => ({
  __esModule: true,
  default: jest.fn(() => mockClient)
}))

// Logger mock
jest.mock('@/lib/logger', () => ({
  logAction: jest.fn(),
  logError: jest.fn()
}))

describe('/api/contact/[id]', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should retrieve a single contact successfully', async () => {
      const mockContact = {
        _id: new ObjectId('507f1f77bcf86cd799439011'),
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        message: 'Test message',
        status: 'new',
        createdAt: new Date()
      }

      mockCollection.findOne.mockResolvedValue(mockContact)

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await GET({}, { params })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockContact)

      expect(mockCollection.findOne).toHaveBeenCalledWith({
        _id: new ObjectId('507f1f77bcf86cd799439011')
      })
    })

    it('should handle invalid ObjectId', async () => {
      const params = { id: 'invalid-id' }
      const response = await GET(new NextRequest(), { params })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Geçersiz ID')
    })

    it('should handle contact not found', async () => {
      mockCollection.findOne.mockResolvedValue(null)

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await GET({}, { params })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Mesaj bulunamadı')
    })

    it('should handle database errors', async () => {
      mockCollection.findOne.mockRejectedValue(new Error('Database error'))

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await GET({}, { params })
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Mesaj getirilemedi')
    })
  })

  describe('PUT', () => {
    it('should update contact status successfully', async () => {
      const updateData = { status: 'read' }
      const mockUpdateResult = { matchedCount: 1, modifiedCount: 1 }

      mockCollection.updateOne.mockResolvedValue(mockUpdateResult)

      const request = {
        json: () => Promise.resolve(updateData)
      }

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await PUT(request, { params })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('Mesaj güncellendi')

      expect(mockCollection.updateOne).toHaveBeenCalledWith(
        { _id: new ObjectId('507f1f77bcf86cd799439011') },
        { $set: { status: 'read' } }
      )
    })

    it('should update contact with notes', async () => {
      const updateData = { status: 'replied', notes: 'Customer replied via email' }
      const mockUpdateResult = { matchedCount: 1, modifiedCount: 1 }

      mockCollection.updateOne.mockResolvedValue(mockUpdateResult)

      const request = {
        json: () => Promise.resolve(updateData)
      }

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await PUT(request, { params })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)

      expect(mockCollection.updateOne).toHaveBeenCalledWith(
        { _id: new ObjectId('507f1f77bcf86cd799439011') },
        { 
          $set: { 
            status: 'replied', 
            notes: 'Customer replied via email',
            repliedAt: expect.any(Date)
          } 
        }
      )
    })

    it('should handle invalid ObjectId', async () => {
      const updateData = { status: 'read' }
      const request = {
        json: () => Promise.resolve(updateData)
      }

      const params = { id: 'invalid-id' }
      const response = await PUT(request, { params })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Geçersiz ID')
    })

    it('should handle contact not found', async () => {
      const updateData = { status: 'read' }
      const mockUpdateResult = { matchedCount: 0, modifiedCount: 0 }

      mockCollection.updateOne.mockResolvedValue(mockUpdateResult)

      const request = {
        json: () => Promise.resolve(updateData)
      }

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await PUT(request, { params })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Mesaj bulunamadı')
    })

    it('should handle database errors', async () => {
      const updateData = { status: 'read' }
      mockCollection.updateOne.mockRejectedValue(new Error('Database error'))

      const request = {
        json: () => Promise.resolve(updateData)
      }

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await PUT(request, { params })
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Mesaj güncellenemedi')
    })
  })

  describe('DELETE', () => {
    it('should delete contact successfully', async () => {
      const mockDeleteResult = { deletedCount: 1 }

      mockCollection.deleteOne.mockResolvedValue(mockDeleteResult)

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await DELETE({}, { params })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('Mesaj silindi')

      expect(mockCollection.deleteOne).toHaveBeenCalledWith({
        _id: new ObjectId('507f1f77bcf86cd799439011')
      })
    })

    it('should handle invalid ObjectId', async () => {
      const params = { id: 'invalid-id' }
      const response = await DELETE({}, { params })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Geçersiz ID')
    })

    it('should handle contact not found', async () => {
      const mockDeleteResult = { deletedCount: 0 }

      mockCollection.deleteOne.mockResolvedValue(mockDeleteResult)

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await DELETE({}, { params })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Mesaj bulunamadı')
    })

    it('should handle database errors', async () => {
      mockCollection.deleteOne.mockRejectedValue(new Error('Database error'))

      const params = { id: '507f1f77bcf86cd799439011' }
      const response = await DELETE({}, { params })
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Mesaj silinemedi')
    })
  })
})
