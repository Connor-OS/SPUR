import {Transaction} from "../model/transactionModel";
import {School} from "../model/dataModel";

export const get = async (req, res, next) => {
    try {
        res.render('your-details', {
            transactionID: req.query.id,
            errors: []});
    } catch (error) {
        next(error)
    }
};

export const post = async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.query.id);
        transaction.customerDetails = req.body
        transaction.save();

        res.redirect("check-your-answers" + "?id=" + req.query.id)
    } catch (error) {
        next(error)
    }
}
