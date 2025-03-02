import {City, School, schoolTypeEnum} from "../model/dataModel";
import {Transaction} from "../model/transactionModel";


/* GET home page. */
export const get = async (req, res, next) => {
    const school = await School.findById(req.query["id"]);
    const city = await City.findById(school.city);

    res.render('school', {
        searchData: req.session?.searchData,
        school: school,
        city: city,
        accommodations: school.accommodation,
        google_api_key: process.env["GOOGLE_MAPS_API"],
        showSearch: true
    });
};

export const post = async (req, res) => {
    let transactionID;
    const transaction = new Transaction({
        "bookingDetails": {...req.body, "schoolID": req.query.id}});
    
    transaction.save().then(transactionID = transaction._id)
    
    res.redirect("your-details" + "?id=" + transactionID)
}
