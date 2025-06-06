import {describe, jest, test} from "@jest/globals";
import {getSearchOptions} from "../../services/searchBar.service";

const findSchoolMinPrice = require("../../services/schoolInfo.service").findSchoolMinPrice;



describe("Test school info service", () => {
    const school = {
        courses: [
            {
                courseName: "Apple picking",
                price_per_week: 100,
                dynamic_pricing: [
                    {
                        min_weeks: 5,
                        price_per_week: 90
                    },
                    {
                        min_weeks: 10,
                        price_per_week: 60
                    }
                ]
            },
            {
                courseName: "Button making",
                price_per_week: 110,
                dynamic_pricing: [
                    {
                        min_weeks: 5,
                        price_per_week: 80
                    },
                    {
                        min_weeks: 10,
                        price_per_week: 40
                    }
                ]
            },
            {
                courseName: "Cheese Tasting",
                price_per_week: 120,
                dynamic_pricing: [
                    {
                        min_weeks: 5,
                        price_per_week: 70
                    },
                    {
                        min_weeks: 10,
                        price_per_week: 50
                    }
                ]
            }
        ]
    }


    test(`test schools price returned via dynamic pricing`, async () => {
        let result = findSchoolMinPrice(school, 1);
    }
}