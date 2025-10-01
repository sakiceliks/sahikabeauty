import { GET, POST } from '@/app/api/talepler/route'
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

describe('/api/talepler', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should return all reservations', async () => {
      const mockReservations = [
        { _id: '1', isimSoyisim: 'John Doe', telefonNo: '0530 123 45 67' },
        { _id: '2', isimSoyisim: 'Jane Doe', telefonNo: '0530 987 65 43' }
      ]
      mockCollection.find().sort().toArray.mockResolvedValue(mockReservations)

      const request = new NextRequest('http://localhost:3000/api/talepler')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockReservations)
      expect(mockCollection.find).toHaveBeenCalledWith({})
    })

    it('should handle database errors', async () => {
      mockCollection.find().sort().toArray.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/talepler')
      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })

  describe('POST', () => {
    it('should create new reservation', async () => {
      const reservationData = {
        isimSoyisim: 'John Doe',
        telefonNo: '0530 123 45 67',
        markaModel: 'iPhone 12',
        sorun: 'Screen repair',
        tarih: '2024-01-15',
        saat: '14:00'
      }

      mockCollection.insertOne.mockResolvedValue({ insertedId: 'new-id' })

      const request = new NextRequest('http://localhost:3000/api/talepler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(mockCollection.insertOne).toHaveBeenCalledWith(
        expect.objectContaining({
          isimSoyisim: reservationData.isimSoyisim,
          telefonNo: reservationData.telefonNo,
          markaModel: reservationData.markaModel,
          sorun: reservationData.sorun,
          tarih: reservationData.tarih,
          saat: reservationData.saat
        })
      )
    })

    it('should return error for missing required fields', async () => {
      const incompleteData = {
        isimSoyisim: 'John Doe'
        // Missing required fields
      }

      const request = new NextRequest('http://localhost:3000/api/talepler', {
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
      const reservationData = {
        isimSoyisim: 'John Doe',
        telefonNo: '0530 123 45 67',
        markaModel: 'iPhone 12',
        sorun: 'Screen repair',
        tarih: '2024-01-15',
        saat: '14:00'
      }

      mockCollection.insertOne.mockRejectedValue(new Error('DB Error'))

      const request = new NextRequest('http://localhost:3000/api/talepler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reservationData)
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toContain('DB Error')
    })
  })
})
