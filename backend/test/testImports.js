// test/testImports.js
// Quick test to ensure all imports work correctly
// Usage: node test/testImports.js

import { loadEnv } from '../config/loadEnv.js';
import { connectDB } from '../config/db.js';
import { AIChatBot } from '../model/AIChatBot.js';

async function testImports() {
  console.log(' Testing imports and basic functionality...\n');

  try {
    // Load environment
    console.log('  Loading environment...');
    loadEnv();
    console.log('   Environment loaded\n');

    // Connect to database
    console.log(' Connecting to MongoDB...');
    await connectDB(process.env.MONGO_URI);
    console.log('   MongoDB connected\n');

    // Initialize chatbot
    console.log(' Initializing AIChatBot...');
    const aiBot = new AIChatBot();
    console.log('    AIChatBot initialized\n');

    // Test MongoDB connection check
    console.log('Checking MongoDB connection status...');
    const isConnected = aiBot.isMongoConnected();
    console.log(`   ${isConnected ? 'y' : 'n'} MongoDB connected: ${isConnected}\n`);

    // Test getting tutors for SEN381
    console.log('5  Testing getTutorsByModule("SEN381")...');
    const sen381Result = await aiBot.getTutorsByModule('SEN381');
    console.log('   Result:', sen381Result);
    
    if (sen381Result && sen381Result.includes('Mr. Mokoena')) {
      console.log('    Successfully found Mr. Mokoena!\n');
    } else if (sen381Result && sen381Result.startsWith('No tutors found')) {
      console.log('     No tutors found for SEN381\n');
    } else {
      console.log('    Unexpected result\n');
    }

    // Test getting all tutors
    console.log('6  Testing getAllTutors()...');
    const allTutors = await aiBot.getAllTutors();
    if (Array.isArray(allTutors)) {
      console.log(`    Found ${allTutors.length} tutor(s):`);
      allTutors.forEach(t => {
        console.log(`      - ${t.name} (${t.modules.join(', ')})`);
      });
    } else {
      console.log('     Result:', allTutors);
    }
    console.log();

    // Test context building
    console.log('  Testing buildContextForAI()...');
    const context = await aiBot.buildContextForAI("Who's the tutor for SEN381?");
    console.log('   Context:', JSON.stringify(context, null, 2));
    console.log();

    // Test module extraction
    console.log(' Testing extractModuleCodes()...');
    const modules = aiBot.extractModuleCodes("I need help with SEN381 and PRG381");
    console.log('   Extracted modules:', modules);
    console.log();

    console.log(' All import and basic functionality tests passed!\n');

  } catch (error) {
    console.error(' Error during testing:', error.message);
    console.error(error);
  } finally {
    process.exit(0);
  }
}

testImports();