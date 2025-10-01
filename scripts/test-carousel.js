// Test carousel data retrieval
import { CarouselModel } from '../models/carousel.js'

async function testCarousel() {
  console.log('Testing carousel data retrieval...')
  
  try {
    const result = await CarouselModel.getAll()
    console.log('CarouselModel.getAll() result:', result)
    
    if (result.success) {
      console.log('✅ Carousel data retrieved successfully')
      console.log('Number of slides:', result.data?.length || 0)
      console.log('Slides data:', result.data)
    } else {
      console.log('❌ Carousel data retrieval failed:', result.error)
    }
  } catch (error) {
    console.error('❌ Error testing carousel:', error)
  }
}

testCarousel()
