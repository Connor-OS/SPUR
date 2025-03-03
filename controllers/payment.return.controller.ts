import { NextFunction, Request, Response } from "express";
import {Transaction} from "../model/transactionModel";

export const get = async (req: Request, res: Response, next: NextFunction) => {

    const transaction = await Transaction.findById(req.query.transactionID);
    transaction.paid = true;
    transaction.save();

    res.render('payment-return', {
    });
};