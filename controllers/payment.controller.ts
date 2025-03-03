import {City, School} from "../model/dataModel";
import {Transaction} from "../model/transactionModel";

export const get = async (req, res, next) => {

    const transaction = await Transaction.findById(req.query.id);
    const bookingDetails = transaction.bookingDetails
    
    const school = await School.findById(bookingDetails.schoolID);
    const city = await City.findById(school.city);

    res.render('payment', {
        school: school,
        city: city,
        transactionID: transaction._id,
        ...bookingDetails,
    });
};

export const post = async (req, res) => {
    console.log(req.body);
}
