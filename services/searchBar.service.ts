import {City, Country} from "../model/dataModel";
const languageList = ["Learn English", "Learn Spanish", "Learn French", "Learn German"];
const ageList = ["16+", "7-16"]; //TODO: pull these from DB instead.

async function getSearchOptions(req) {
    
    const cities: typeof City = await City.find();

    let countries: object = {};

    for (const city of cities) {
        const countryDoc: typeof Country = await Country.findById(city.country);
        if (!countryDoc) continue;

        const countryName = countryDoc.name;

        if (countries[countryName]) {
            countries[countryName].push(city.name);
        } else {
            countries[countryName] = [city.name];
        }
    }

    return {"languages": languageList,
        "countries": countries,
        "ages": ageList}
}

export { getSearchOptions };
