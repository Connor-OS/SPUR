const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    class_size:{ type: String, required: true },
    schedule: { type: String, required: true },
    other_details: { type: Array, required: false},
    important_info: {type: String, required: false},
    price_per_week: { type: Number, required: true },
},{
    versionKey: false
});

const accommodationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    options: [],
    price_per_week: { type: Number, required: true },
},{
    versionKey: false
});

// School schema
const schoolSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    google_maps: { type: String, required: false },
    school_type: { type: Number, required: true },
    courses: [courseSchema],
    accommodation: [accommodationSchema],
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'City', required: true},
    review_score: { type: Number, required: true },
},{
    versionKey: false
});

// City schema
const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    google_maps: { type: String, required: false },
},{
    versionKey: false
});

// TODO: Accommodation schema here

export enum schoolTypeEnum {
    'Language Course' = 1,
    'University' = 2,
    'Private School' = 3,
    'Distance Learning' = 4,
}

export const City = mongoose.model('cities', citySchema);
export const School = mongoose.model('schools', schoolSchema);
