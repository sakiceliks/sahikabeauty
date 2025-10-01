const { MongoClient } = require('mongodb')

async function addPublishedField() {
  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db('beauty_center')
    const collection = db.collection('services')
    
    // Tüm service'lere published: false field'ı ekle
    const result = await collection.updateMany(
      { published: { $exists: false } }, // published field'ı olmayan tüm document'lar
      { $set: { published: false } } // published: false ekle
    )
    
    console.log(`Updated ${result.modifiedCount} services with published: false`)
    
    // Kontrol et
    const services = await collection.find({}).toArray()
    console.log('Sample service:', {
      _id: services[0]?._id,
      title: services[0]?.title,
      published: services[0]?.published
    })
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
  }
}

addPublishedField()
