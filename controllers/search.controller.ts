import {City, School, schoolTypeEnum} from "../model/dataModel";
import {getSearchOptions} from "../services/searchBar.service";
import {dateHelper} from "../services/dateHelper.service";
import {NextFunction} from "express";

enum sortByValues {
    'Recommendation' = 'review_score',
    'Low to High Price' = 'min_price',
    'High to low Price' = 'max_price',
}

export const get = async (req, res, next: NextFunction) => {
    try {
        const searchData = req.query;
    
        const city = await City.findOne({"name": searchData["city"]});
        const date_range: string = searchData["date"]
        const dates: string[] = date_range.split(" - ");
        const start_date: Date = dateHelper(dates[0])
        const end_date: Date = dateHelper(dates[1])
    
        const formatter = new Intl.DateTimeFormat("en-GB", {day: "numeric", month: "short"});
        const date_string: string = `${formatter.format(start_date)} - ${formatter.format(end_date)}`;
    
        let length_of_study_weeks: number = ((end_date.valueOf() - start_date.valueOf()) / (1000 * 60 * 60 * 24) + 3) / 7
    
        // get schools
        let schools = await School.find({"city": city.id}).lean();
    
        // Compute some course specific info
        schools.forEach(school => {
                school['min_price'] = Math.min(...school.courses.map(course => course.price_per_week * length_of_study_weeks))
                school['course_list'] = school.courses.map(course => course.name).join(" / ")
            }
        )
    
        res.render("search_results", {
            city: city,
            schools: schools,
            date_string: date_string,
            search: await getSearchOptions(req),
            searchData: searchData,
            searchQuery: new URLSearchParams(searchData).toString(),
        })
    } catch (error) {
        next(error);
    }
}
