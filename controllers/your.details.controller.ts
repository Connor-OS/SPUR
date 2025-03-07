import {Transaction} from "../model/transactionModel";
import {School} from "../model/dataModel";

export const get = async (req, res, next) => {
    
    res.render('your-details', {
        transactionID: req.query.id,
        errors: []});
};

export const post = async (req, res) => {

    const transaction = await Transaction.findById(req.query.id);
    transaction.customerDetails = req.body
    transaction.save();

    res.redirect("check-your-answers" + "?id=" + req.query.id)
}
