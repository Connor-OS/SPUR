const mongoose = require('mongoose');
import {findSchoolMinPrice} from "../services/schoolInfo.service";

const courseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    class_size:{ type: String, required: true },
    schedule: { type: String, required: true },
    other_details: { type: Array, required: false},
    important_info: {type: String, required: false},
    price_per_week: { type: Number, required: true },
    dynamic_pricing: [],
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
    city: { type: mongoose.Schema.Types.ObjectId, ref: 'city', required: true},
    review_score: { type: Number, required: true },
    extra_fees: [],
},{
    versionKey: false
});

schoolSchema.virtual('course_list').get(function() {
    return this.courses.map(course => course.name).join(' / ');
});

schoolSchema.methods.getMinPrice = function(length_of_study_weeks: number) {
    return findSchoolMinPrice(this, length_of_study_weeks);
};

// City schema
const citySchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: false },
    google_maps: { type: String, required: false },
    country: { type: mongoose.Schema.Types.ObjectId, ref: 'country', required: true},
},{
    versionKey: false
});

// Country schema
const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
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

export const City = mongoose.model('city', citySchema);
export const School = mongoose.model('school', schoolSchema);
export const Course = mongoose.model('course', courseSchema);
export const Country = mongoose.model('country', countrySchema);
