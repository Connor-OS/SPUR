import mongoose from 'mongoose'
import fs from 'fs';
import {Country, City, School} from "../dist/model/dataModel.js";


// MongoDB connection string (replace with your actual URI)
const mongoURI = 'mongodb://localhost:27017/spur';


async function uploadData() {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB');

    // Country Data
    const countries = JSON.parse(fs.readFileSync('data/spur.countries.json', 'utf8'));
    await Country.insertMany(countries);
    console.log('Data uploaded successfully');

    // City Data
    const cities = JSON.parse(fs.readFileSync('data/spur.cities.json', 'utf8'));
    await City.insertMany(cities);
    console.log('Data uploaded successfully');

    // School Data
    const schools = JSON.parse(fs.readFileSync('data/spur.schools.json', 'utf8'));
    for (const city of cities) {
      for (const school of schools) {
        school.city = city["_id"];

        const insertedSchool = await School.create(school);
        console.log('School uploaded successfully:', insertedSchool);
      }
    }

    // Disconnect
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error uploading data:', error);
  }
}

uploadData();
