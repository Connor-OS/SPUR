const mongoose = require('mongoose');

// City schema
const citySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    google_maps: { type: String, required: false },
    schools: [{ type: Number, ref: 'School' }]
});

// School schema
const schoolSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    google_maps: { type: String, required: false },
    courses: [{ type: Object, ref: 'Course' }],
    city: { type: Number, ref: 'City', required: true }
});

export enum schoolTypeEnum {
    'Language Course' = 1,
    'University' = 2,
    'Private School' = 3,
    'Distance Learning' = 4,
}


// removing in favour of storing course information inside schools
// Course schema
// const courseSchema = new mongoose.Schema({
//     id: { type: Number, required: true, unique: true },
//     name: { type: String, required: true },
//     description: { type: String, required: false },
//     type: { type: Number, required: true },
//     group: { type: String, required: false },
//     schedule: { type: String, required: false },
//     hours_per_week: { type: String, required: false },
//     age: { type: String, required: false },
//     school: { type: Number, ref: 'School', required: true }
// });

export const City = mongoose.model('cities', citySchema);
export const School = mongoose.model('schools', schoolSchema);
