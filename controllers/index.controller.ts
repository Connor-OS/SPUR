import {City, School, schoolTypeEnum} from "../model/dataModel";

const courseList = ["Language Course", "University", "Private school", "Distance Learning"];
const ageList = ["16+", "7-16"]; //TODO: make these global variables set on initialisation

/* GET home page. */
export const get = async (req, res, next) => {
    const cities = await City.find();

    res.render('index', {
        frontPage: "frontpage",
        courseList: courseList,
        cityList: cities.map(city => city.name),
        ageList: ageList,
        carousel_elements: cities});
};

export const post = async (req, res) => {
    console.log(req.body);
}


