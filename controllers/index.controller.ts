import {City, School, schoolTypeEnum} from "../model/dataModel";
import reviews from "../model/reviews.json";

const languageList = ["Learn English", "Learn Spanish", "Learn French", "Learn German"];
const ageList = ["16+", "7-16"]; //TODO: make these global variables set on initialisation or store in db

/* GET home page. */
export const get = async (req, res, next) => {
    const cities = await City.find();
    // const reviews = require("../model/testData/reviews.json");

    res.render('index', {
        frontPage: "frontpage",
        languageList: languageList,
        cityList: cities.map(city => city.name),
        ageList: ageList,
        carousel_elements: cities,
        reviews: reviews
    });
};

export const post = async (req, res) => {
    console.log(req.body);
}


