import clientPromise from "../lib/mongodb.js"

const COLLECTION_NAME = "carousel"

export class CarouselModel {
  static async getAll() {
    try {
      console.log("CarouselModel: getAll() called")
      const client = await clientPromise
      console.log("CarouselModel: MongoDB client connected")
      
      const db = client.db('beauty_center')
      console.log("CarouselModel: Database accessed: beauty_center")
      
      const collection = db.collection(COLLECTION_NAME)
      console.log("CarouselModel: Collection accessed:", COLLECTION_NAME)
      
      const slides = await collection.find({}).sort({ order: 1 }).toArray()
      console.log("CarouselModel: Found", slides.length, "slides")
      console.log("CarouselModel: Slides data:", slides)
      
      return {
        success: true,
        data: slides
      }
    } catch (error) {
      console.error("CarouselModel: Error in getAll():", error)
      console.error("CarouselModel: Error details:", {
        message: error.message,
        stack: error.stack,
        name: error.name
      })
      return {
        success: false,
        error: "Carousel verileri getirilemedi: " + error.message
      }
    }
  }

  static async getById(id) {
    try {
      const client = await clientPromise
      const db = client.db('beauty_center')
      const collection = db.collection(COLLECTION_NAME)
      
      const slide = await collection.findOne({ _id: id })
      return {
        success: true,
        data: slide
      }
    } catch (error) {
      console.error("Carousel slide getirirken hata:", error)
      return {
        success: false,
        error: "Carousel slide getirilemedi"
      }
    }
  }

  static async create(slideData) {
    try {
      const client = await clientPromise
      const db = client.db('beauty_center')
      const collection = db.collection(COLLECTION_NAME)
      
      const result = await collection.insertOne({
        ...slideData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      
      const newSlide = await collection.findOne({ _id: result.insertedId })
      return {
        success: true,
        data: newSlide
      }
    } catch (error) {
      console.error("Carousel slide oluşturulurken hata:", error)
      return {
        success: false,
        error: "Carousel slide oluşturulamadı"
      }
    }
  }

  static async update(id, updateData) {
    try {
      console.log("CarouselModel: update() called with ID:", id)
      console.log("CarouselModel: update() called with data:", updateData)
      
      const client = await clientPromise
      const db = client.db('beauty_center')
      const collection = db.collection(COLLECTION_NAME)
      
      // ObjectId import et
      const { ObjectId } = await import('mongodb')
      
      // ID'yi ObjectId'ye çevir
      let objectId
      try {
        objectId = new ObjectId(id)
      } catch (error) {
        console.error("CarouselModel: Invalid ObjectId:", id)
        return {
          success: false,
          error: "Geçersiz slide ID formatı"
        }
      }
      
      console.log("CarouselModel: Using ObjectId:", objectId)
      
      const result = await collection.updateOne(
        { _id: objectId },
        { 
          $set: {
            ...updateData,
            updatedAt: new Date()
          }
        }
      )
      
      console.log("CarouselModel: Update result:", result)
      
      if (result.matchedCount === 0) {
        console.log("CarouselModel: No slide found with ID:", id)
        return {
          success: false,
          error: "Slide bulunamadı"
        }
      }
      
      const updatedSlide = await collection.findOne({ _id: objectId })
      console.log("CarouselModel: Updated slide:", updatedSlide)
      
      return {
        success: true,
        data: updatedSlide
      }
    } catch (error) {
      console.error("CarouselModel: Error in update():", error)
      return {
        success: false,
        error: "Carousel slide güncellenemedi: " + error.message
      }
    }
  }

  static async delete(id) {
    try {
      const client = await clientPromise
      const db = client.db('beauty_center')
      const collection = db.collection(COLLECTION_NAME)
      
      const result = await collection.deleteOne({ _id: id })
      
      if (result.deletedCount === 0) {
        return {
          success: false,
          error: "Slide bulunamadı"
        }
      }
      
      return {
        success: true,
        data: { id }
      }
    } catch (error) {
      console.error("Carousel slide silinirken hata:", error)
      return {
        success: false,
        error: "Carousel slide silinemedi"
      }
    }
  }

  static async updateOrder(id, newOrder) {
    try {
      const client = await clientPromise
      const db = client.db('beauty_center')
      const collection = db.collection(COLLECTION_NAME)
      
      const result = await collection.updateOne(
        { _id: id },
        { 
          $set: {
            order: newOrder,
            updatedAt: new Date()
          }
        }
      )
      
      if (result.matchedCount === 0) {
        return {
          success: false,
          error: "Slide bulunamadı"
        }
      }
      
      return {
        success: true,
        data: { id, order: newOrder }
      }
    } catch (error) {
      console.error("Carousel slide sıralaması güncellenirken hata:", error)
      return {
        success: false,
        error: "Carousel slide sıralaması güncellenemedi"
      }
    }
  }
}
