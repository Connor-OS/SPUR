import {City, School, schoolTypeEnum} from "../model/dataModel";

/* GET home page. */
export const get = async (req, res, next) => {
    const school = await School.findById(req.query["id"]);
    const city = await City.findById(school.city);

    res.render('school', {
        searchData: req.session?.searchData,
        school: school,
        city: city,
        accommodations: school.accommodation,
        google_api_key: process.env["GOOGLE_MAPS_API"]
    });
};

export const post = async (req, res) => {
    console.log(req.query.id);
    console.log(req.body)

    req.session.bookingDetails = req.body;
    res.redirect("payment" + "?id=" + req.query.id)
}
