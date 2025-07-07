import { NextFunction, Request, Response } from "express";
import {Transaction} from "../model/transactionModel";
import EmailService from "../services/email.service";

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = await Transaction.findById(req.query.transactionID);
        transaction.paid = true;
        transaction.save();

        await EmailService.sendEmail("troy.tingle1@gmail.com", "Payment Successful", "testTemplate", { name: "Troy Tingle"});

        res.render('payment-return', {
            transactionID: transaction._id
        });
    } catch (error) {
        next(error)
    }
};