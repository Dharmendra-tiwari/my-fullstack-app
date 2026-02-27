import dotenv from 'dotenv';
dotenv.config({ path: './.env.local' });
import dbConnect from './lib/mongodb.ts';

async function main() {
  try {
    await dbConnect();
    console.log('Connection test successful');
  } catch (err) {
    console.error('Connection failed:', err);
  }
}

main();