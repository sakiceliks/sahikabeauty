import clientPromise from '../lib/mongodb';

export class ServiceModel {
  constructor() {
    this.collectionName = 'services';
  }

  async getCollection() {
    const client = await clientPromise;
    const db = client.db('beauty_center');
    return db.collection(this.collectionName);
  }

  async findAll() {
    try {
      const collection = await this.getCollection();
      const services = await collection.find({}).sort({ id: 1 }).toArray();
      return services;
    } catch (error) {
      throw new Error(`Error fetching services: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const collection = await this.getCollection();
      const service = await collection.findOne({ id: parseInt(id) });
      return service;
    } catch (error) {
      throw new Error(`Error fetching service: ${error.message}`);
    }
  }

  async findBySlug(slug) {
    try {
      const collection = await this.getCollection();
      const service = await collection.findOne({ slug });
      return service;
    } catch (error) {
      throw new Error(`Error fetching service: ${error.message}`);
    }
  }

  async findByCategory(category) {
    try {
      const collection = await this.getCollection();
      const services = await collection.find({ category }).sort({ id: 1 }).toArray();
      return services;
    } catch (error) {
      throw new Error(`Error fetching services by category: ${error.message}`);
    }
  }

  async create(serviceData) {
    try {
      const collection = await this.getCollection();
      
      // Get the highest ID to auto-increment
      const lastService = await collection.findOne({}, { sort: { id: -1 } });
      const newId = lastService ? lastService.id + 1 : 1;
      
      const newService = {
        ...serviceData,
        id: newId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      const result = await collection.insertOne(newService);
      return { ...newService, _id: result.insertedId };
    } catch (error) {
      throw new Error(`Error creating service: ${error.message}`);
    }
  }

  async update(id, updateData) {
    try {
      const collection = await this.getCollection();
      
      const updatedService = {
        ...updateData,
        updatedAt: new Date()
      };

      const result = await collection.updateOne(
        { id: parseInt(id) },
        { $set: updatedService }
      );

      if (result.matchedCount === 0) {
        throw new Error('Service not found');
      }

      return await this.findById(id);
    } catch (error) {
      throw new Error(`Error updating service: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const collection = await this.getCollection();
      const result = await collection.deleteOne({ id: parseInt(id) });
      
      if (result.deletedCount === 0) {
        throw new Error('Service not found');
      }

      return { success: true, message: 'Service deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting service: ${error.message}`);
    }
  }

  async search(query) {
    try {
      const collection = await this.getCollection();
      const services = await collection.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { description: { $regex: query, $options: 'i' } },
          { category: { $regex: query, $options: 'i' } }
        ]
      }).sort({ id: 1 }).toArray();
      
      return services;
    } catch (error) {
      throw new Error(`Error searching services: ${error.message}`);
    }
  }
}
