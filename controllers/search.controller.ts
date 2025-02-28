import {City, School, schoolTypeEnum} from "../model/dataModel";

enum sortByValues {
    'Recommendation' = 'review_score',
    'Low to High Price' = 'min_price',
    'High to low Price' = 'max_price',
}

function dateHelper(dateString) {
    let d = dateString.split("/");
    return new Date(d[2] + '/' + d[1] + '/' + d[0]);
}

export const get = async (req, res) => {
    
    const searchData = req.session?.searchData
    
    if (!searchData) {
        res.render("search_results")
    }

    const city = await City.findOne({"name": searchData["city"]});
    const date_range: string = searchData["date"]
    const dates: string[] = date_range.split(" - ");
    const start_date: Date = dateHelper(dates[0])
    const end_date: Date = dateHelper(dates[1])

    const formatter = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "short" });
    const date_string = `${formatter.format(start_date)} - ${formatter.format(end_date)}`;

    let length_of_study_weeks = (end_date.getDate() - start_date.getDate() + 3)/ 7

    // get schools
    let schools = await School.find({ "city": city.id}).lean();

    // Compute some course specific info
    schools.forEach(school => {
        school['min_price'] = Math.min(...school.courses.map(course => course.price_per_week * length_of_study_weeks))
        school['course_list'] = school.courses.map(course => course.name).join(" / ")}
    )

    res.render("search_results", {
        searchData: searchData,
        city: city,
        schools: schools,
        date_string: date_string,
        showSearch: true
    })
}
