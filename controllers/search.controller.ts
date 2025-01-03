import {City, School, schoolTypeEnum} from "../model/dataModel";

const _MS_PER_WEEK = 1000 * 60 * 60 * 24 * 7;

export const post = async (req, res) => {

    const emptyFields = Object.entries(req.body)
        .filter(([key, value]) => value === "")
        .map(([key, value]) => key);

    if (emptyFields.length !== 0) {
        // TODO: Implement general validation for these fields, and retain inital inputs
        return res.redirect("/");
    }

    const city = await City.findOne({"name": req.body["city"]});
    const date_range: string = req.body["date"]
    const dates: string[] = date_range.split(" - ");

    const start_date: Date = new Date(dates[0])
    const end_date: Date = new Date(dates[1])

    const formatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric" });
    const date_string = `${formatter.format(start_date)} - ${formatter.format(end_date)}`;

    let length_of_study_weeks: number = (end_date.getTime() - start_date.getTime())/_MS_PER_WEEK

    let schools = await School.find({ "city": city.id});

    schools.forEach(school =>
        school['min_price'] = Math.min(...school.courses.map(course => course.price_per_week))
    )

    res.render("search_results", {
        city: city.name,
        schools: schools,
        length_of_study: length_of_study_weeks,
        date_string: date_string,
    })
}
