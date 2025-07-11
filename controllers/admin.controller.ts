import { City, School, schoolTypeEnum } from "../model/dataModel";
import { Request, Response, NextFunction } from "express";

// Helper to get school type list
function getSchoolTypeList() {
  return Object.entries(schoolTypeEnum)
    .filter(([k, v]) => typeof v === "string")
    .map(([k, v]) => ({ name: v, value: schoolTypeEnum[v as keyof typeof schoolTypeEnum] }));
}

export const get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cities = await City.find();
    const schoolTypes = getSchoolTypeList();
    res.render("admin", {
      cities,
      schoolTypes,
      errors: [],
      success: req.query.success,
    });
  } catch (error) {
    next(error);
  }
};

export const post = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Parse nested arrays from form data
    const parseArray = (prefix: string, nestedKeys: string[] = []) => {
      const arr = [];
      let i = 0;
      while (req.body[`${prefix}[${i}][name]`]) {
        const obj: any = {};
        for (const key in req.body) {
          const match = key.match(new RegExp(`^${prefix}\\[${i}\\]\\[(.+)\\]$`));
          if (match) {
            const field = match[1];
            if (nestedKeys.includes(field)) {
              // Parse nested array for this field
              obj[field] = parseArray(`${prefix}[${i}][${field}]`);
            } else {
              obj[field] = req.body[key];
            }
          }
        }
        arr.push(obj);
        i++;
      }
      return arr;
    };

    let courses = parseArray("courses");
    courses = courses.map(course => {
      if (typeof course.other_details === "string") {
        course.other_details = course.other_details
          .split(",")
          .map(s => s.trim())
          .filter(Boolean);
      }
      return course;
    });

    const schoolData: any = {
      name: req.body.name,
      description: req.body.description,
      google_maps: req.body.google_maps,
      school_type: req.body.school_type,
      review_score: req.body.review_score,
      city: req.body.city,
      courses: courses,
      accommodation: parseArray("accommodation", ["options"]),
      extra_fees: parseArray("extra_fees"),
    };

    await School.create(schoolData);
    res.redirect("/admin?success=1");
  } catch (error) {
    next(error);
  }
};
