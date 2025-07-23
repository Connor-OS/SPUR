import {City, School} from "../model/dataModel";
import {Transaction} from "../model/transactionModel";

export const get = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.query.id);
        const bookingDetails = transaction.bookingDetails
        const customerDetails = transaction.customerDetails;

        const school = await School.findById(bookingDetails.schoolID).populate({
            path: 'city',
            populate: { path: 'country' }
        });

        res.render('check-your-answers', {
            school: school,
            transactionID: req.query.id,
            booking: bookingDetails,
            customer: customerDetails,
        });
    } catch (error) {
        next(error)
    }
};