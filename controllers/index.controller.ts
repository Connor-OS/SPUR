import {City, School, schoolTypeEnum} from "../model/dataModel";
import reviews from "../model/reviews.json";
import {getSearchOptions} from "../services/searchBar.service";

/* GET home page. */
export const get = async (req, res, next) => {
    const cities = await City.find();

    res.render('index', {
        frontPage: "frontpage",
        carousel_elements: cities,
        reviews: reviews,
        search: await getSearchOptions(req)
    });
};

export const post = async (req, res) => {
    const emptyFields = Object.entries(req.body)
        .filter(([key, value]) => value === "")
        .map(([key, value]) => key);

    // Validate search fields
    if (emptyFields.length !== 0) {
        // TODO: Implement general validation for these fields, and retain inital inputs
        return res.redirect("/");
    }

    req.session.searchData = req.body;

    return res.redirect("search")
}


