import {City, School, schoolTypeEnum} from "../model/dataModel";
import reviews from "../model/reviews.json";

const languageList = ["Learn English", "Learn Spanish", "Learn French", "Learn German"];
const ageList = ["16+", "7-16"]; //TODO: pull these from DB instead.

/* GET home page. */
export const get = async (req, res, next) => {
    const cities = await City.find();

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


