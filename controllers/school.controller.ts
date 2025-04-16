import {City, School, schoolTypeEnum} from "../model/dataModel";
import {Transaction} from "../model/transactionModel";
import {getSearchOptions} from "../services/searchBar.service";


/* GET home page. */
export const get = async (req, res, next) => {
    try {
        const school = await School.findById(req.query["id"]);
        const city = await City.findById(school.city);

        res.render('school', {
            school: school,
            city: city,
            accommodations: school.accommodation,
            google_api_key: process.env["GOOGLE_MAPS_API"],
            search: await getSearchOptions(req),
            searchData: req.query,
        });
    } catch (error) {
        next(error)
    }
};

export const post = async (req, res, next) => {
    try {
        let transactionID;
        const transaction = new Transaction({
            "bookingDetails": {...req.body, "schoolID": req.query.id}});

        transaction.save().then(transactionID = transaction._id)

        res.redirect("your-details" + "?id=" + transactionID)
    } catch (error) {
        next(error)
    }
}
