import {City, School, schoolTypeEnum} from "../model/dataModel";
import reviews from "../model/reviews.json";
import {getSearchOptions} from "../services/searchBar.service";

/* GET home page. */
export const get = async (req, res, next) => {
    try {
        const cities = await City.find();

        res.render('index', {
            frontPage: "frontpage",
            carousel_elements: cities,
            reviews: reviews,
            search: await getSearchOptions(req),
        });
    } catch (error) {
        next(error)
    }
};

export const post = async (req, res, next) => {
    try {
        return res.redirect(`search?${new URLSearchParams(req.body).toString()}`);
    } catch (error) {
        next(error)
    }
}


