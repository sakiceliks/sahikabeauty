const { GET, PUT } = require('@/app/api/contact-page/route')

// MongoDB mock
const mockCollection = {
  findOne: jest.fn(),
  updateOne: jest.fn(),
  insertOne: jest.fn()
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

describe('/api/contact-page', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should retrieve existing contact page data', async () => {
      const mockContactData = {
        _id: '507f1f77bcf86cd799439011',
        title: 'İletişim',
        subtitle: 'Bizimle iletişime geçin',
        description: 'Herhangi bir sorunuz için bize ulaşabilirsiniz',
        mainImage: 'https://example.com/contact.jpg',
        address: 'İstanbul, Türkiye',
        phone: '+90 212 123 45 67',
        email: 'info@example.com',
        whatsapp: '+90 212 123 45 67',
        workingHours: 'Pazartesi - Cuma: 09:00 - 18:00',
        socialMedia: {
          facebook: 'https://facebook.com/example',
          instagram: 'https://instagram.com/example',
          twitter: 'https://twitter.com/example'
        },
        features: [
          { title: 'Hızlı Yanıt', description: '24 saat içinde yanıt' },
          { title: 'Uzman Destek', description: 'Profesyonel ekip' }
        ],
        mapEmbed: '<iframe src="https://maps.google.com/..."></iframe>',
        updatedAt: new Date()
      }

      mockCollection.findOne.mockResolvedValue(mockContactData)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockContactData)

      expect(mockCollection.findOne).toHaveBeenCalledWith({})
    })

    it('should return default data when no contact page exists', async () => {
      mockCollection.findOne.mockResolvedValue(null)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual({
        title: 'İletişim',
        subtitle: 'Bizimle İletişime Geçin',
        description: 'Herhangi bir sorunuz için bize ulaşabilirsiniz. Size en kısa sürede dönüş yapacağız.',
        mainImage: '/assets/contact/contact-hero.jpg',
        address: 'İstanbul, Türkiye',
        phone: '+90 212 123 45 67',
        email: 'info@sultanbeyliguzellikmerkezi.com.tr',
        whatsapp: '+90 212 123 45 67',
        workingHours: 'Pazartesi - Cuma: 09:00 - 18:00\nCumartesi: 09:00 - 16:00\nPazar: Kapalı',
        socialMedia: {
          facebook: 'https://facebook.com/sahikabeauty',
          instagram: 'https://instagram.com/sahikabeauty',
          twitter: 'https://twitter.com/sahikabeauty'
        },
        features: [
          {
            title: 'Hızlı Yanıt',
            description: 'Tüm mesajlarınıza 24 saat içinde yanıt veriyoruz'
          },
          {
            title: 'Uzman Destek',
            description: 'Deneyimli ekibimiz size en iyi hizmeti sunar'
          },
          {
            title: 'Güvenli İletişim',
            description: 'Tüm bilgileriniz güvenli şekilde korunur'
          }
        ],
        mapEmbed: '<iframe src="https://www.google.com/maps/embed?pb=..." width="100%" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>'
      })
    })

    it('should handle database errors', async () => {
      mockCollection.findOne.mockRejectedValue(new Error('Database error'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('İletişim sayfası verileri getirilemedi')
    })
  })

  describe('PUT', () => {
    it('should update contact page data successfully', async () => {
      const updateData = {
        title: 'Güncellenmiş İletişim',
        subtitle: 'Yeni alt başlık',
        description: 'Güncellenmiş açıklama',
        phone: '+90 212 999 99 99',
        email: 'new@example.com'
      }

      const mockUpdateResult = { matchedCount: 1, modifiedCount: 1 }
      mockCollection.updateOne.mockResolvedValue(mockUpdateResult)

      const request = {
        json: () => Promise.resolve(updateData)
      }

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('İletişim sayfası güncellendi')

      expect(mockCollection.updateOne).toHaveBeenCalledWith(
        {},
        { 
          $set: {
            ...updateData,
            updatedAt: expect.any(Date)
          }
        },
        { upsert: true }
      )
    })

    it('should create new contact page data if none exists', async () => {
      const updateData = {
        title: 'Yeni İletişim Sayfası',
        subtitle: 'Yeni alt başlık',
        description: 'Yeni açıklama'
      }

      const mockUpdateResult = { matchedCount: 0, modifiedCount: 0, upsertedId: '507f1f77bcf86cd799439011' }
      mockCollection.updateOne.mockResolvedValue(mockUpdateResult)

      const request = {
        json: () => Promise.resolve(updateData)
      }

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toBe('İletişim sayfası güncellendi')
    })

    it('should handle missing required fields', async () => {
      const updateData = {
        title: 'Sadece başlık'
        // Missing other required fields
      }

      const mockUpdateResult = { matchedCount: 1, modifiedCount: 1 }
      mockCollection.updateOne.mockResolvedValue(mockUpdateResult)

      const request = {
        json: () => Promise.resolve(updateData)
      }

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
    })

    it('should handle database errors', async () => {
      const updateData = {
        title: 'Test Title'
      }

      mockCollection.updateOne.mockRejectedValue(new Error('Database error'))

      const request = {
        json: () => Promise.resolve(updateData)
      }

      const response = await PUT(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('İletişim sayfası güncellenemedi')
    })
  })
})
