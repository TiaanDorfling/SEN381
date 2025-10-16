
import mongoose from 'mongoose';
import { loadEnv } from '../config/loadEnv.js';
import { connectDB } from '../config/db.js';

// Direct connection to TutorDirectory collection
const TutorDirectorySchema = new mongoose.Schema({
  name: String,
  email: String,
  assignedModules: [{ type: String }]
}, { collection: 'TutorDirectory' });

const TutorDirectory = mongoose.model('TutorDirectory', TutorDirectorySchema);

async function testConnection() {
  try {
    console.log('Loading environment variables...');
    loadEnv();

    console.log('Connecting to MongoDB...');
    await connectDB(process.env.MONGO_URI);

    console.log('MongoDB connected successfully!\n');

    // List all collections
    console.log(' Available collections:');
    const collections = await mongoose.connection.db.listCollections().toArray();
    collections.forEach(coll => {
      console.log(`   - ${coll.name}`);
    });
    console.log();

    // Test 1: Count tutors in TutorDirectory
    console.log('Test 1: Counting tutors in TutorDirectory...');
    const tutorCount = await TutorDirectory.countDocuments();
    console.log(`   Found ${tutorCount} tutor(s) in TutorDirectory collection\n`);

    // Test 2: List all tutors from TutorDirectory
    console.log('Test 2: Listing all tutors from TutorDirectory...');
    const tutors = await TutorDirectory.find({}).lean();
    
    if (tutors.length === 0) {
      console.log(' No tutors found in TutorDirectory collection\n');
    } else {
      tutors.forEach((t, idx) => {
        console.log(`   ${idx + 1}. ${t.name}`);
        console.log(`      Email: ${t.email || 'N/A'}`);
        console.log(`      Modules: ${t.assignedModules?.join(', ') || 'None'}\n`);
      });
    }

    // Test 3: Query specific module
    console.log(' Test 3: Searching for SEN381 tutors...');
    const sen381Tutors = await TutorDirectory.find({ 
      assignedModules: 'SEN381' 
    }).lean();
    
    if (sen381Tutors.length === 0) {
      console.log('   No tutors found for SEN381\n');
    } else {
      sen381Tutors.forEach(t => {
        console.log(`   - ${t.name} (${t.email})`);
      });
      console.log();
    }

    // Test 4: Search by name
    console.log(' Test 4: Searching for tutor "Mokoena"...');
    const searchResult = await TutorDirectory.find({
      name: { $regex: 'Mokoena', $options: 'i' }
    }).lean();
    
    if (searchResult.length === 0) {
      console.log('   No tutors found matching "Mokoena"\n');
    } else {
      searchResult.forEach(t => {
        console.log(`   - ${t.name} (${t.email})`);
        console.log(`     Modules: ${t.assignedModules?.join(', ')}`);
      });
      console.log();
    }

    //  users 
    console.log(' Checking users collection...');
    const usersCount = await mongoose.connection.db.collection('users').countDocuments();
    console.log(`   Found ${usersCount} document(s) in users collection\n`);

    console.log(' All tests completed successfully!');

  } catch (error) {
    console.error(' Error during testing:', error.message);
    console.error(error);
  } finally {
    await mongoose.disconnect();
    console.log('\n Disconnected from MongoDB');
    process.exit(0);
  }
}

testConnection();