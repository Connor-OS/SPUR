import {City} from "../model/dataModel";
const languageList = ["Learn English", "Learn Spanish", "Learn French", "Learn German"];
const ageList = ["16+", "7-16"]; //TODO: pull these from DB instead.

async function getSearchOptions(req) {
    
    const cities = await City.find();
    return {"languages": languageList,
        "cities": cities.map(city => city.name),
        "ages": ageList}
}

export { getSearchOptions };
