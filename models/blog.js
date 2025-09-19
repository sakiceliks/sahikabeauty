import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export class BlogModel {
  constructor() {
    this.collectionName = "blogs"
  }

  async getCollection() {
    const client = await clientPromise
    const db = client.db("beauty_center") // kendi DB adını yaz
    return db.collection(this.collectionName)
  }

  async findAll() {
    const col = await this.getCollection()
    return col.find({}).sort({ date: -1 }).toArray()
  }

  async findPublished() {
    const col = await this.getCollection()
    return col.find({ published: true }).sort({ date: -1 }).toArray()
  }

  async findById(id) {
    const col = await this.getCollection()
    return col.findOne({ _id: new ObjectId(id) })
  }

  async findBySlug(slug) {
    if (!slug) {
      console.error("findBySlug - slug is empty or undefined")
      return null
    }
    
    const col = await this.getCollection()
    console.log("findBySlug - searching for slug:", slug)
    const result = await col.findOne({ slug })
    console.log("findBySlug - result:", result)
    return result
  }

  async search(keyword) {
    const col = await this.getCollection()
    return col.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
      ],
    }).toArray()
  }

  async create(data) {
    const col = await this.getCollection()
    const result = await col.insertOne({
      ...data,
      date: data.date || new Date().toISOString(),
      views: data.views || 0,
      published: data.published !== undefined ? data.published : true,
    })
    return { _id: result.insertedId, ...data }
  }

  async update(id, data) {
    const col = await this.getCollection()
    const result = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: data },
      { returnDocument: "after" }
    )
    if (!result.value) throw new Error("Blog not found")
    return result.value
  }

  async updateBySlug(slug, data) {
    try {
      const col = await this.getCollection()
      console.log("updateBySlug - slug:", slug, "data:", data)
      
      // Published değerini boolean'a çevir
      const updateData = { ...data }
      if (typeof updateData.published === 'string') {
        updateData.published = updateData.published === 'true'
      }
      
      console.log("updateBySlug - updateData:", updateData)
      
      // Önce blog'un var olup olmadığını kontrol et
      const existingBlog = await col.findOne({ slug })
      if (!existingBlog) {
        console.error("updateBySlug - blog not found for slug:", slug)
        throw new Error("Blog not found")
      }
      
      console.log("updateBySlug - existing blog found:", existingBlog._id)
      
      // Update işlemini yap
      const updateResult = await col.updateOne(
        { slug },
        { $set: { ...updateData, updatedAt: new Date() } }
      )
      
      console.log("updateBySlug - updateResult:", updateResult)
      
      if (updateResult.matchedCount === 0) {
        console.error("updateBySlug - no document matched")
        throw new Error("Blog not found")
      }
      
      if (updateResult.modifiedCount === 0) {
        console.log("updateBySlug - no changes made, but document exists")
      }
      
      // Güncellenmiş blog'u getir
      const updatedBlog = await col.findOne({ slug })
      console.log("updateBySlug - updated blog:", updatedBlog)
      
      if (!updatedBlog) {
        console.error("updateBySlug - updated blog not found")
        throw new Error("Blog not found")
      }
      
      console.log("updateBySlug - success, returning:", updatedBlog)
      return updatedBlog
    } catch (error) {
      console.error("updateBySlug - error:", error)
      throw error
    }
  }

  async delete(id) {
    const col = await this.getCollection()
    const result = await col.deleteOne({ _id: new ObjectId(id) })
    if (result.deletedCount === 0) throw new Error("Blog not found")
    return { message: "Blog deleted successfully" }
  }

  async deleteBySlug(slug) {
    const col = await this.getCollection()
    const result = await col.deleteOne({ slug })
    if (result.deletedCount === 0) throw new Error("Blog not found")
    return { message: "Blog deleted successfully" }
  }
}
