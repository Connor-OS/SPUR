import {City, School, schoolTypeEnum} from "../model/dataModel";

const _MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;
enum sortByValues {
    'Recommendation' = 'review_score',
    'Low to High Price' = 'min_price',
    'High to low Price' = 'max_price',
}


export const post = async (req, res) => {

    const emptyFields = Object.entries(req.body)
        .filter(([key, value]) => value === "")
        .map(([key, value]) => key);

    // Validate search fields
    if (emptyFields.length !== 0) {
        // TODO: Implement general validation for these fields, and retain inital inputs
        return res.redirect("/");
    }

    const city = await City.findOne({"name": req.body["city"]});
    const date_range: string = req.body["date"]
    const dates: string[] = date_range.split(" - ");

    const start_date: Date = new Date(dates[0])
    const end_date: Date = new Date(dates[1])

    const formatter = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
    const date_string = `${formatter.format(start_date)} - ${formatter.format(end_date)}`;

    let length_of_study_weeks: number = (end_date.getTime() - start_date.getTime())/_MS_PER_WEEK

    // get schools
    let schools = await School.find({ "city": city.id}).lean();

    // Compute some course specific info
    schools.forEach(school => {
        school['min_price'] = Math.min(...school.courses.map(course => course.price_per_week))
        school['course_list'] = school.courses.map(course => course.name).join(" / ")}
    )

    //TODO: consider refactoring sort by to client side

    // Sort by, options: price: high->low, price: low->high, recommendation
    let sortBy = sortByValues[req.body["sort_by"]]
    if (sortBy === "max_price") {
        sortBy = "min_price"
    }

    schools.sort((a, b) => {
        if (a[sortBy] > b[sortBy]) return -1;
        if (a[sortBy] < b[sortBy]) return 1;
        return 0;
    });

    if (sortByValues[req.body["sort_by"]] === "min_price") {
        schools.reverse()
    }

    res.render("search_results", {
        req_body: req.body,
        sort_by: req.body["sort_by"],
        city: city.name,
        schools: schools,
        length_of_study: length_of_study_weeks,
        date_string: date_string,
    })
}
