import clientPromise from "@/lib/mongodb"
import { ObjectId } from "mongodb"

export class ServiceModel {
  static async getAll() {
    try {
      const client = await clientPromise
      const db = client.db("beauty_center")
      const services = await db.collection("services").find({}).sort({ createdAt: -1 }).toArray()
      return { success: true, data: services }
    } catch (error) {
      console.error("Error getting all services:", error)
      return { success: false, error: "Services could not be retrieved." }
    }
  }

  static async getById(id) {
    try {
      const client = await clientPromise
      const db = client.db("beauty_center")
      const service = await db.collection("services").findOne({ _id: new ObjectId(id) })
      return { success: true, data: service }
    } catch (error) {
      console.error("Error getting service by id:", error)
      return { success: false, error: "Service could not be retrieved." }
    }
  }

  static async create(serviceData) {
    try {
      const client = await clientPromise
      const db = client.db("beauty_center")
      const result = await db.collection("services").insertOne({
        ...serviceData,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      return { success: true, data: { _id: result.insertedId, ...serviceData } }
    } catch (error) {
      console.error("Error creating service:", error)
      return { success: false, error: "Service could not be created." }
    }
  }

  static async update(id, updateData) {
    try {
      console.log("ServiceModel.update called with:", { id, updateData });
      const client = await clientPromise
      const db = client.db("beauty_center")
      const objectId = new ObjectId(id)
      console.log("ObjectId created:", objectId);
      
      // First check if service exists
      const existingService = await db.collection("services").findOne({ _id: objectId });
      console.log("Existing service:", existingService);
      
      if (!existingService) {
        console.log("Service not found in database");
        return { success: false, error: "Service not found." }
      }
      
      // Update the service
      const updateResult = await db.collection("services").updateOne(
        { _id: objectId },
        { $set: { ...updateData, updatedAt: new Date() } }
      );
      console.log("Update result:", updateResult);
      
      if (updateResult.modifiedCount > 0) {
        // Fetch the updated service
        const updatedService = await db.collection("services").findOne({ _id: objectId });
        console.log("Updated service:", updatedService);
        return { success: true, data: updatedService }
      } else {
        console.log("No changes made to service");
        return { success: false, error: "Service could not be updated." }
      }
    } catch (error) {
      console.error("Error updating service:", error)
      return { success: false, error: "Service could not be updated." }
    }
  }

  static async delete(id) {
    try {
      const client = await clientPromise
      const db = client.db("beauty_center")
      const objectId = new ObjectId(id)
      const result = await db.collection("services").deleteOne({ _id: objectId })
      if (result.deletedCount === 1) {
        return { success: true, data: { id } }
      } else {
        return { success: false, error: "Service not found." }
      }
    } catch (error) {
      console.error("Error deleting service:", error)
      return { success: false, error: "Service could not be deleted." }
    }
  }

  static async search(searchTerm) {
    try {
      const client = await clientPromise
      const db = client.db("beauty_center")
      const services = await db.collection("services").find({
        $or: [
          { title: { $regex: searchTerm, $options: 'i' } },
          { description: { $regex: searchTerm, $options: 'i' } }
        ]
      }).sort({ createdAt: -1 }).toArray()
      return { success: true, data: services }
    } catch (error) {
      console.error("Error searching services:", error)
      return { success: false, error: "Services search failed." }
    }
  }

  static async findByCategory(category) {
    try {
      const client = await clientPromise
      const db = client.db("beauty_center")
      const services = await db.collection("services").find({ category }).sort({ createdAt: -1 }).toArray()
      return { success: true, data: services }
    } catch (error) {
      console.error("Error getting services by category:", error)
      return { success: false, error: "Services could not be retrieved by category." }
    }
  }
}