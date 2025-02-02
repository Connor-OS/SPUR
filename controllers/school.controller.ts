import {City, School, schoolTypeEnum} from "../model/dataModel";

/* GET home page. */
export const get = async (req, res, next) => {
    const school = await School.findById(req.query["id"]);
    const city = await City.findById(school.city);

    res.render('school', {
        school: school,
        city: city.name,
        courses: school.courses,
        coursesNames: school.courses.map(course => course.name),
        google_api_key: process.env["GOOGLE_MAPS_API"]
    });
};

export const post = async (req, res) => {
    console.log(req.body);
}
