import {City} from "../model/dataModel";
const languageList = ["Learn English", "Learn Spanish", "Learn French", "Learn German"];
const ageList = ["16+", "7-16"]; //TODO: pull these from DB instead.

async function getSearchOptions(req) {
    
    if (req.session?.search) {
        return req.session.search
    }
    
    const cities = await City.find();
    req.session.search = {"languages": languageList,
        "cities": cities.map(city => city.name),
        "ages": ageList}
    
    return req.session.search
}

export { getSearchOptions };
