const { POST, GET } = require('@/app/api/contact/route')

// MongoDB mock is now global in jest.setup.js

// Logger mock
jest.mock('@/lib/logger', () => ({
  logAction: jest.fn(),
  logError: jest.fn()
}))

describe('/api/contact', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST', () => {
    it('should create a new contact message successfully', async () => {
      const mockContactData = {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        message: 'Test message'
      }

      const mockInsertResult = {
        insertedId: '507f1f77bcf86cd799439011'
      }

      const mockCollection = {
        insertOne: jest.fn().mockResolvedValue(mockInsertResult)
      }
      const mockDb = { collection: jest.fn(() => mockCollection) }
      const mockClient = { db: jest.fn(() => mockDb) }
      require('@/lib/mongodb').default.mockResolvedValue(mockClient)

      const request = {
        json: () => Promise.resolve(mockContactData)
      }

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.id).toBe('507f1f77bcf86cd799439011')
      expect(data.message).toBe('Mesajınız başarıyla gönderildi')

      expect(mockCollection.insertOne).toHaveBeenCalledWith({
        name: 'John Doe',
        email: 'john@example.com',
        phone: '1234567890',
        message: 'Test message',
        createdAt: expect.any(Date),
        status: 'new'
      })
    })

    it('should handle missing required fields', async () => {
      const mockContactData = {
        name: 'John Doe'
        // Missing email, phone, message
      }

      const request = {
        json: () => Promise.resolve(mockContactData)
      }

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      // Should still work with partial data
    })

    it('should handle database errors', async () => {
      const mockContactData = {
        name: 'John Doe',
        email: 'john@example.com',
        message: 'Test message'
      }

      mockCollection.insertOne.mockRejectedValue(new Error('Database error'))

      const request = {
        json: () => Promise.resolve(mockContactData)
      }

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Mesaj gönderilemedi')
    })
  })

  describe('GET', () => {
    it('should retrieve all contacts successfully', async () => {
      const mockContacts = [
        {
          _id: '507f1f77bcf86cd799439011',
          name: 'John Doe',
          email: 'john@example.com',
          message: 'Test message 1',
          status: 'new',
          createdAt: new Date()
        },
        {
          _id: '507f1f77bcf86cd799439012',
          name: 'Jane Doe',
          email: 'jane@example.com',
          message: 'Test message 2',
          status: 'read',
          createdAt: new Date()
        }
      ]

      mockCollection.toArray.mockResolvedValue(mockContacts)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockContacts)
      expect(data.data).toHaveLength(2)

      expect(mockCollection.find).toHaveBeenCalledWith({})
      expect(mockCollection.sort).toHaveBeenCalledWith({ createdAt: -1 })
      expect(mockCollection.toArray).toHaveBeenCalled()
    })

    it('should handle empty contacts list', async () => {
      mockCollection.toArray.mockResolvedValue([])

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual([])
    })

    it('should handle database errors', async () => {
      mockCollection.toArray.mockRejectedValue(new Error('Database error'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Mesajlar getirilemedi')
    })
  })
})