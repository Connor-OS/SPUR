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
        searchData: searchData,
        sort_by: req.body["sort_by"],
        city: city,
        schools: schools,
        date_string: date_string,
    })
}
