import mongoose from 'mongoose'
import fs from 'fs';
import {City, School, schoolTypeEnum} from "../dist/model/dataModel.js";


// MongoDB connection string (replace with your actual URI)
const mongoURI = 'mongodb://localhost:27017/spur';


async function uploadData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Read JSON file
    const data = JSON.parse(fs.readFileSync('data/spur.cities.json', 'utf8'));

    // Insert data into the collection
    await City.insertMany(data);
    console.log('Data uploaded successfully');

    const school = JSON.parse(fs.readFileSync('data/spur.schools.json', 'utf8'));
    const newcastle = await City.findOne({ name: 'Newcastle' });
    school.city = newcastle._id;

    const insertedSchool = await School.create(school);
    console.log('School uploaded successfully:', insertedSchool);


    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

uploadData();
