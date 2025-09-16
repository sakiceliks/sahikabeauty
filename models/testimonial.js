import clientPromise from "../lib/mongodb";

export class TestimonialModel {
  constructor() {
    this.collectionName = "testimonials";
  }

  async getCollection() {
    const client = await clientPromise;
    const db = client.db("beauty_center");
    return db.collection(this.collectionName);
  }

  async findAll() {
    try {
      const collection = await this.getCollection();
      const testimonials = await collection.find({}).sort({ createdAt: -1 }).toArray();
      return testimonials;
    } catch (error) {
      throw new Error(`Error fetching testimonials: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const collection = await this.getCollection();
      const testimonial = await collection.findOne({ _id: id });
      return testimonial;
    } catch (error) {
      throw new Error(`Error fetching testimonial: ${error.message}`);
    }
  }

  async findByServiceId(serviceId) {
    try {
      const collection = await this.getCollection();
      const testimonials = await collection
        .find({ serviceId: parseInt(serviceId), isApproved: true })
        .sort({ createdAt: -1 })
        .toArray();
      return testimonials;
    } catch (error) {
      throw new Error(`Error fetching testimonials by service: ${error.message}`);
    }
  }

  async create(testimonialData) {
    try {
      const collection = await this.getCollection();

      // ID auto-increment
      const lastItem = await collection.findOne({}, { sort: { id: -1 } });
      const newId = lastItem ? lastItem.id + 1 : 1;

      const newTestimonial = {
        ...testimonialData,
        id: newId,
        rating: testimonialData.rating || 5,
        isApproved: testimonialData.isApproved ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await collection.insertOne(newTestimonial);
      return { ...newTestimonial, _id: result.insertedId };
    } catch (error) {
      throw new Error(`Error creating testimonial: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const collection = await this.getCollection();

      const updatedData = {
        ...updateData,
        updatedAt: new Date(),
      };

      const result = await collection.updateOne(
        { _id: id },
        { $set: updatedData }
      );

      if (result.matchedCount === 0) {
        throw new Error("Testimonial not found");
      }

      return await this.findById(id);
    } catch (error) {
      throw new Error(`Error updating testimonial: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne({ _id: id });

      if (result.deletedCount === 0) {
        throw new Error("Testimonial not found");
      }

      return { success: true, message: "Testimonial deleted successfully" };
    } catch (error) {
      throw new Error(`Error deleting testimonial: ${error.message}`);
    }
  }

  async approve(id, status = true) {
    try {
      const collection = await this.getCollection();
      const result = await collection.updateOne(
        { _id: id },
        { $set: { isApproved: status, updatedAt: new Date() } }
      );

      if (result.matchedCount === 0) {
        throw new Error("Testimonial not found");
      }

      return await this.findById(id);
    } catch (error) {
      throw new Error(`Error approving testimonial: ${error.message}`);
    }
  }
}
