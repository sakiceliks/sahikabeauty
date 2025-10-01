import { GET, POST } from '@/app/api/telegram-config/route'
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

describe('/api/telegram-config', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return telegram configuration', async () => {
      const mockConfig = {
        _id: '1',
        botToken: 'test-bot-token',
        chatId: 'test-chat-id',
        enabled: true
      }
      mockCollection.findOne.mockResolvedValue(mockConfig)

      const request = new NextRequest('http://localhost:3000/api/telegram-config')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockConfig)
      expect(mockCollection.findOne).toHaveBeenCalledWith({})
    })

    it('should return null when no config found', async () => {
      mockCollection.findOne.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/telegram-config')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toBeNull()
    })

    it('should handle database errors', async () => {
      mockCollection.findOne.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/telegram-config')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })

  describe('POST', () => {
    it('should create new telegram configuration', async () => {
      const configData = {
        botToken: 'new-bot-token',
        chatId: 'new-chat-id',
        enabled: true
      }

      mockCollection.insertOne.mockResolvedValue({ insertedId: 'new-id' })

      const request = new NextRequest('http://localhost:3000/api/telegram-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockCollection.insertOne).toHaveBeenCalledWith(
        expect.objectContaining(configData)
      )
    })

    it('should return error for missing required fields', async () => {
      const incompleteData = {
        botToken: 'test-token'
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3000/api/telegram-config', {
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
      const configData = {
        botToken: 'test-bot-token',
        chatId: 'test-chat-id',
        enabled: true
      }

      mockCollection.insertOne.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/telegram-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(configData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })
})
