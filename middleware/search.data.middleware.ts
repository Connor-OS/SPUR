import e, { Request, Response, NextFunction } from 'express';
import { RequestHandler } from 'express';

export const searchFields: RequestHandler = (req, res, next) => {
    
    // TODO: IDeally this function should not just check empty fields but check that values are searchable in the DB 
    //  (or let empty searches be returned) and should return erros associated with the invalid fields
    const searchData = req.query;
    if (searchData["date"] == "Select Date") {
        searchData["date"] = "";
    }

    const emptyFields = Object.entries(searchData)
        .filter(([key, value]) => value === "")
        .map(([key, value]) => key);

    // Validate search fields
    if (emptyFields.length !== 0) {
        return res.redirect('back');
    }
    next();
};