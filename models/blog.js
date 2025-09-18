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
    const col = await this.getCollection()
    return col.findOne({ slug })
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
    const col = await this.getCollection()
    console.log("updateBySlug - slug:", slug, "data:", data)
    const result = await col.findOneAndUpdate(
      { slug },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: "after" }
    )
    console.log("updateBySlug - result:", result)
    if (!result || !result.value) throw new Error("Blog not found")
    return result.value
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
