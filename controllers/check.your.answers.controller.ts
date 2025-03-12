import {City, School} from "../model/dataModel";
import {Transaction} from "../model/transactionModel";

export const get = async (req, res, next) => {

    const transaction = await Transaction.findById(req.query.id);
    const bookingDetails = transaction.bookingDetails
    const customerDetails = transaction.customerDetails;

    const school = await School.findById(bookingDetails.schoolID);
    const city = await City.findById(school.city);

    res.render('check-your-answers', {
        school: school,
        city: city,
        transactionID: req.query.id,
        booking: bookingDetails,
        customer: customerDetails,
    });
};