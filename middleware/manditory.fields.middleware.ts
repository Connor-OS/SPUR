import { Request, Response, NextFunction } from 'express';

export const mandatoryFields = (req: Request, res: Response, next: NextFunction): void => {

    const emptyFields = Object.entries(req.body)
        .filter(([key, value]) => value === "")
        .map(([key, value]) => key);

    // Validate search fields
    if (emptyFields.length != 0) {
        return res.render(req.route.path.slice(1),{errors: emptyFields, 
            transactionID: req.query?.id,
        ...req.body});
    }

    next();
};