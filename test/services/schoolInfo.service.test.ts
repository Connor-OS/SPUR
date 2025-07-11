import {describe, expect, jest, test} from "@jest/globals";

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
        expect(result).toEqual(100)

        result = findSchoolMinPrice(school, 5);
        expect(result).toEqual(70*5)

        result = findSchoolMinPrice(school, 10);
        expect(result).toEqual(40*10)

    });
});
