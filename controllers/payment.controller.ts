import {City, School} from "../model/dataModel";

export const get = async (req, res, next) => {
    
    // if (!req.session.bookingDetails) {
    //     res.redirect("search");
    // }

    const bookingDetails = req.session.bookingDetails
    
    const school = await School.findById(req.query["id"]);
    const city = await City.findById(school.city);

    res.render('payment', {
        school: school,
        city: city,
        hideSearch: true,
        ...bookingDetails,
    });
};

export const post = async (req, res) => {
    console.log(req.body);
}
