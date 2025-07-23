import {City, School, Course} from "../model/dataModel";
import {Transaction} from "../model/transactionModel";
import {getSearchOptions} from "../services/searchBar.service";
import {findCourseMinPrice} from "../services/schoolInfo.service"
import {dateHelper} from "../services/dateHelper.service";

/* GET home page. */
export const get = async (req, res, next) => {
    try {
        const school = await School.findById(req.query["id"]).populate({
            path: 'city',
            populate: { path: 'country' }
        });

        const searchData = req.query;

        const date_range: string = searchData["date"]
        const dates: string[] = date_range.split(" - ");
        const start_date: Date = dateHelper(dates[0])
        const end_date: Date = dateHelper(dates[1])

        let length_of_study_weeks: number = ((end_date.valueOf() - start_date.valueOf()) / (1000 * 60 * 60 * 24) + 3) / 7

        const courses: [typeof Course] = school.courses;
        courses.forEach( (course) => {
            course.price_per_week = findCourseMinPrice(course, length_of_study_weeks)
        })
        // TODO: Because this is done, we need to ensure the page is refreshed every time length of study changes
        //  otherwise these prices could be inaccurate

        res.render('school', {
            school: school,
            accommodations: school.accommodation,
            google_api_key: process.env["GOOGLE_MAPS_API"],
            search: await getSearchOptions(req),
            searchData: req.query,
        });
    } catch (error) {
        next(error)
    }
};

export const post = async (req, res, next) => {
    try {
        let transactionID;
        const transaction = new Transaction({
            "bookingDetails": {...req.body, "schoolID": req.query.id}});

        transaction.save().then(transactionID = transaction._id)

        res.redirect("your-details" + "?id=" + transactionID)
    } catch (error) {
        next(error)
    }
}
