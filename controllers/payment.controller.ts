import {City, School} from "../model/dataModel";

export const get = async (req, res, next) => {
    const school = await School.findById(req.query["id"]);
    const city = await City.findById(school.city);
    
    console.log(req.session)

    res.render('payment', {
        school: school,
        city: city,
    });
};

export const post = async (req, res) => {
    console.log(req.body);
}
