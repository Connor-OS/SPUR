import {Country, City, School} from "../model/dataModel";
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
        // TODO: users should be more free to search by city or even country, or other params
        const searchData = req.query;
    
        const city = await City.findOne({"name": searchData["city"]});
        const date_range: string = searchData["date"]
        const dates: string[] = date_range.split(" - ");
        const start_date: Date = dateHelper(dates[0])
        const end_date: Date = dateHelper(dates[1])
    
        const formatter = new Intl.DateTimeFormat("en-GB", {day: "numeric", month: "short"});
        const date_string: string = `${formatter.format(start_date)} - ${formatter.format(end_date)}`;
    
        let length_of_study_weeks: number = ((end_date.valueOf() - start_date.valueOf()) / (1000 * 60 * 60 * 24) + 3) / 7
    
        // get schools, an populate city + country
        let schools: [typeof School] = await School.find({"city": city.id}).populate({
            path: 'city',
            populate: { path: 'country' }
        });
    
        // Enrich schools with price info
        schools.forEach(school => {
                school['min_price'] = school.getMinPrice(length_of_study_weeks)
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
