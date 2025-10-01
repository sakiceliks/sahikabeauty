const { GET, PUT } = require('@/app/api/about/route')

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

describe('/api/about', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('GET', () => {
    it('should retrieve existing about page data', async () => {
      const mockAboutData = {
        _id: '507f1f77bcf86cd799439011',
        title: 'Hakkımızda',
        subtitle: 'Şahika Beauty Hakkında',
        description: 'Güzellik ve bakım alanında uzman ekibimizle hizmet veriyoruz',
        mainImage: 'https://example.com/about.jpg',
        mission: 'Müşterilerimize en iyi hizmeti sunmak',
        stats: [
          { number: '500+', label: 'Mutlu Müşteri' },
          { number: '5+', label: 'Yıl Deneyim' }
        ],
        features: [
          { title: 'Uzman Ekip', description: 'Deneyimli profesyoneller' },
          { title: 'Modern Teknoloji', description: 'En son teknolojiler' }
        ],
        whyChooseUs: [
          { title: 'Kalite', description: 'Yüksek kalite standartları' },
          { title: 'Güven', description: 'Güvenilir hizmet' }
        ],
        contactInfo: {
          address: 'İstanbul, Türkiye',
          phone: '+90 212 123 45 67',
          email: 'info@example.com'
        },
        socialMedia: {
          facebook: 'https://facebook.com/example',
          instagram: 'https://instagram.com/example'
        },
        updatedAt: new Date()
      }

      mockCollection.findOne.mockResolvedValue(mockAboutData)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual(mockAboutData)

      expect(mockCollection.findOne).toHaveBeenCalledWith({})
    })

    it('should return default data when no about page exists', async () => {
      mockCollection.findOne.mockResolvedValue(null)

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toEqual({
        title: 'Hakkımızda',
        subtitle: 'Şahika Beauty - Güzellik ve Bakım Merkezi',
        description: '2019 yılından beri İstanbul\'da hizmet veren Şahika Beauty, modern teknoloji ve uzman ekibiyle müşterilerimize en kaliteli güzellik ve bakım hizmetlerini sunmaktadır.',
        mainImage: '/assets/about/img.jpg',
        mission: 'Müşterilerimizin güzellik ve bakım ihtiyaçlarını en üst düzeyde karşılayarak, onlara kendilerini özel hissettirmek ve güven duygusu aşılamaktır.',
        stats: [
          { number: '500+', label: 'Mutlu Müşteri' },
          { number: '5+', label: 'Yıl Deneyim' },
          { number: '50+', label: 'Uzman Personel' },
          { number: '100%', label: 'Müşteri Memnuniyeti' }
        ],
        features: [
          {
            title: 'Uzman Ekip',
            description: 'Alanında deneyimli ve sertifikalı uzman ekibimizle hizmet veriyoruz'
          },
          {
            title: 'Modern Teknoloji',
            description: 'En son teknoloji ve ekipmanlarla güvenli ve etkili tedaviler sunuyoruz'
          },
          {
            title: 'Hijyen Standartları',
            description: 'En yüksek hijyen standartlarında steril ortamda hizmet veriyoruz'
          },
          {
            title: 'Kişisel Yaklaşım',
            description: 'Her müşterimizin ihtiyaçlarına özel çözümler geliştiriyoruz'
          }
        ],
        whyChooseUs: [
          {
            title: 'Kalite',
            description: 'Sadece en kaliteli ürün ve malzemeleri kullanarak hizmet veriyoruz'
          },
          {
            title: 'Güven',
            description: 'Müşterilerimizin güvenini kazanmak bizim önceliğimizdir'
          },
          {
            title: 'Deneyim',
            description: 'Yılların verdiği deneyimle en iyi sonuçları elde ediyoruz'
          },
          {
            title: 'Hizmet',
            description: 'Müşteri memnuniyeti odaklı hizmet anlayışımızla fark yaratıyoruz'
          }
        ],
        contactInfo: {
          address: 'İstanbul, Türkiye',
          phone: '+90 212 123 45 67',
          email: 'info@sultanbeyliguzellikmerkezi.com.tr'
        },
        socialMedia: {
          facebook: 'https://facebook.com/sahikabeauty',
          instagram: 'https://instagram.com/sahikabeauty',
          twitter: 'https://twitter.com/sahikabeauty'
        }
      })
    })

    it('should handle database errors', async () => {
      mockCollection.findOne.mockRejectedValue(new Error('Database error'))

      const response = await GET()
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Hakkımızda sayfası verileri getirilemedi')
    })
  })

  describe('PUT', () => {
    it('should update about page data successfully', async () => {
      const updateData = {
        title: 'Güncellenmiş Hakkımızda',
        subtitle: 'Yeni alt başlık',
        description: 'Güncellenmiş açıklama',
        mission: 'Yeni misyon'
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
      expect(data.message).toBe('Hakkımızda sayfası güncellendi')

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

    it('should create new about page data if none exists', async () => {
      const updateData = {
        title: 'Yeni Hakkımızda Sayfası',
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
      expect(data.message).toBe('Hakkımızda sayfası güncellendi')
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
      expect(data.error).toBe('Hakkımızda sayfası güncellenemedi')
    })
  })
})
