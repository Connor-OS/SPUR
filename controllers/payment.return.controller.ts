import { NextFunction, Request, Response } from "express";

export const get = async (req: Request, res: Response, next: NextFunction) => {

    res.render('payment-return', {
    });
};