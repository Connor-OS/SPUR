import { NextFunction, Request, Response } from "express";
import {Transaction} from "../model/transactionModel";
import EmailService from "../services/email.service";
import {School} from "../model/dataModel";

export const get = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const transaction = await Transaction.findById(req.query.transactionID);
        transaction.paid = true;
        transaction.save();

        const customer = transaction.customerDetails;
        const booking = transaction.bookingDetails;
        const school = await School.findById(booking.schoolID);

        await EmailService.sendEmail(customer.email, "Payment Successful", "bookingConfirmation",
            { name: `${customer.first_name} ${customer.last_name}`,
                course: booking.course,
                school: school.name,
                refNum: transaction._id });

        res.render('payment-return', {
            transactionID: transaction._id
        });
    } catch (error) {
        next(error)
    }
};