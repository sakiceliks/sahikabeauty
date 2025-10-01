const { MongoClient } = require('mongodb')

async function updateServiceImages() {
  const client = new MongoClient(process.env.MONGODB_URI)
  
  try {
    await client.connect()
    console.log('Connected to MongoDB')
    
    const db = client.db('beauty_center')
    const collection = db.collection('services')
    
    // Image path mapping
    const imageMappings = {
      '/assets/services/dudak-renklendirme.png': '/slide/sld11.png',
      '/assets/services/ignesiz-mezoterapi.png': '/slide/sld10.png',
      '/assets/services/24k-altin-bakim.png': '/slide/sld9.png',
      '/assets/services/cilt-genclestirme.png': '/slide/sld8.png',
      '/assets/services/lazer-epilasyon.png': '/slide/sld1.png',
      '/assets/services/ipl-epilasyon.png': '/slide/sld2.png',
      '/assets/services/elastik-bant-epilasyon.png': '/slide/sld3.png',
      '/assets/services/bolgesel-incelme.png': '/slide/sld4.png',
      '/assets/services/anti-cellulite.png': '/slide/sld5.png',
      '/assets/services/ozon-terapi.png': '/slide/sld6.png',
      '/assets/services/hydrafacial.png': '/slide/sld7.png'
    }
    
    // Update each service with correct image path
    for (const [oldPath, newPath] of Object.entries(imageMappings)) {
      const result = await collection.updateMany(
        { image: oldPath },
        { $set: { image: newPath } }
      )
      
      if (result.modifiedCount > 0) {
        console.log(`Updated ${result.modifiedCount} services: ${oldPath} -> ${newPath}`)
      }
    }
    
    // Check remaining services with old paths
    const remainingOldPaths = await collection.find({
      image: { $regex: '^/assets/services/' }
    }).toArray()
    
    if (remainingOldPaths.length > 0) {
      console.log('Remaining services with old paths:')
      remainingOldPaths.forEach(service => {
        console.log(`- ${service.title}: ${service.image}`)
      })
    } else {
      console.log('All service images updated successfully!')
    }
    
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await client.close()
  }
}

updateServiceImages()
