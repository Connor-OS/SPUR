import {City, School, schoolTypeEnum} from "../model/dataModel";

const courseList = ["Language Course", "University", "Private school", "Distance Learning"];
const ageList = ["16+", "7-16"]; //TODO: make these global variables set on initialisation

/* GET home page. */
export const get = async (req, res, next) => {
    const school = await School.findById(req.query["id"]);
    const city = await City.findById(school.city);

    res.render('school', {
        school: school,
        city: city.name
    });
};

export const post = async (req, res) => {
    console.log(req.body);
}
