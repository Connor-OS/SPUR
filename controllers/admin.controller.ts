import { City, School } from "../model/dataModel";
import { Request, Response, NextFunction } from "express";

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cities = await City.find();
    const schools = await School.find().populate('city');

    const hydratedFormData = req.query.school ? await School.findById(req.query.school): {};

    res.render("admin", {
      cities,
      schools,
      errors: [],
      success: req.query.success,
      school: hydratedFormData,
    });
  } catch (error) {
    next(error);
  }
};


export function parseFormInput(formData: object) {

  const result = {};

  // pass the flat HTML form Data into a nested JSON structure
  for (const formKey in formData) {
    const value = formData[formKey];
    const keys: Array<any> = formKey.match(/[^\[\]]+/g);

    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const key = isFinite(keys[i]) ? Number(keys[i]) : keys[i];

      // Last key: set the value
      if (i === keys.length - 1) {
        if (Array.isArray(current)) {
          current[key] = value;
        } else {
          current[key] = value;
        }
      } else {
        const nextKey = isFinite(keys[i + 1]) ? Number(keys[i + 1]) : keys[i + 1];
        const isNextArray = typeof nextKey === 'number';

        if (current[key] === undefined) {
          current[key] = isNextArray ? [] : {};
        }

        current = current[key];
      }
    }
  }

  // split course other details on comma
  result["courses"].map(course => {course.other_details = course.other_details
      .split(",")
      .map(s => s.trim())
      .filter(Boolean);})

  return result;
}

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const schoolData: any = parseFormInput(req.body);
    if (schoolData.id) {
      await School.findByIdAndUpdate(schoolData.id, schoolData, { new: true });
    } else {
      await School.create(schoolData);
    }
    res.redirect("/admin?success=1");
  } catch (error) {
    next(error);
  }
};
