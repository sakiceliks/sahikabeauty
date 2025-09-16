import { MongoClient } from 'mongodb';
import { services } from '../data/services.js';

const uri = "mongodb+srv://saki:IzogizG02A6yNCBW@mern.mhhyfp6.mongodb.net/?retryWrites=true&w=majority";

if (!uri) {
  console.error('Please add your Mongo URI to .env.local');
  process.exit(1);
}

async function seedData() {
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('beauty_center');
    const collection = db.collection('services');
    
    // Clear existing data
    await collection.deleteMany({});
    console.log('Cleared existing services');
    
    // Add timestamps to services
    const servicesWithTimestamps = services.map(service => ({
      ...service,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Insert services
    const result = await collection.insertMany(servicesWithTimestamps);
    console.log(`Inserted ${result.insertedCount} services`);
    
    // Create indexes
    await collection.createIndex({ id: 1 }, { unique: true });
    await collection.createIndex({ slug: 1 }, { unique: true });
    await collection.createIndex({ category: 1 });
    await collection.createIndex({ title: "text", description: "text" });
    
    console.log('Created indexes');
    console.log('✅ Database seeded successfully!');
    
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await client.close();
  }
}

// Run if called directly
if (process.argv[1] === new URL(import.meta.url).pathname) {
  seedData();
}

export { seedData };
