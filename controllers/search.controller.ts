import {City, School, schoolTypeEnum} from "../model/dataModel";

export const post = async (req, res) => {

    const city = await City.findOne({"name": req.body["city"]});
    const course_id = schoolTypeEnum[req.body["course"] as keyof typeof schoolTypeEnum];

    const schools = await School.find({"school_type" : course_id, "city": city.id});

    res.render("search_results", {
        city: city.name,
        schools: schools
    })
}
