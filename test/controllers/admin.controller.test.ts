import { describe, expect, test, jest } from '@jest/globals';
const app = require("../../app");
import { parseFormInput } from "../../controllers/admin.controller"
import request from "supertest";

describe("Admin controller tests", () => {

    test(`renders the admin page`, async () => {
        const resp = await request(app).get("/admin");

        expect(resp.status).toEqual(200);
        expect(resp.text).toContain("Add a New School");
    });



    test( `successful post from admin constructs school json`, async () => {



        const resp = parseFormInput(
            {
            "name": "test school",
                "google_maps": "test.googlemaps.com",
                "review_score": "0.3",
                "city": "24b0f0a4c1a1b1a100000001",
                "school_type": "1",
                "description": "great school, to bad it isn't real.",
                "courses[0][name]": "test course",
                "courses[0][description]": "Learn English on this course, if it existed",
                "courses[0][class_size]": "999",
                "courses[0][schedule]": "9-5",
                "courses[0][important_info]": "important details",
                "courses[0][price_per_week]": "1000",
                "courses[0][other_details]": "this,list, is , seperated,by ,   commas,",
                "courses[1][name]": "test course 2",
                "courses[1][description]": "yet another fake course",
                "courses[1][class_size]": "30 people",
                "courses[1][schedule]": "all day",
                "courses[1][important_info]": "important info",
                "courses[1][price_per_week]": "99",
                "courses[1][other_details]": "just one detail",
                "accommodation[0][name]": "Family home test",
                "accommodation[0][description]": "staying with a local family would be nice if this weren't a test",
                "accommodation[0][price_per_week]": "99",
                "accommodation[0][options][0][name]": "bed",
                "accommodation[0][options][0][price_per_week]": "64",
                "accommodation[0][options][0][prechecked]": "true",
                "accommodation[0][options][1][name]": "lamp",
                "accommodation[0][options][1][price_per_week]": "10",
                "accommodation[0][options][2][name]": "chair",
                "accommodation[0][options][2][price_per_week]": "45",
                "accommodation[0][options][3][name]": "windows",
                "accommodation[0][options][3][price_per_week]": "0",
                "accommodation[0][options][3][prechecked]": "true",
                "extra_fees[0][name]": "test fee",
                "extra_fees[0][amount]": "123",
                "extra_fees[1][name]": "test fee 2",
                "extra_fees[1][amount]": "456"
        });


        const expected = {
            "name": "test school",
            "description": "great school, to bad it isn't real.",
            "google_maps": "test.googlemaps.com",
            "school_type": "1",
            "courses": [
            {
                "name": "test course",
                "description": "Learn English on this course, if it existed",
                "class_size": "999",
                "schedule": "9-5",
                "other_details": [
                    "this",
                    "list",
                    "is",
                    "seperated",
                    "by",
                    "commas"
                ],
                "important_info": "important details",
                "price_per_week": "1000",
            },
            {
                "name": "test course 2",
                "description": "yet another fake course",
                "class_size": "30 people",
                "schedule": "all day",
                "other_details": [
                    "just one detail"
                ],
                "important_info": "important info",
                "price_per_week": "99",
            }
        ],
            "accommodation": [
            {
                "name": "Family home test",
                "description": "staying with a local family would be nice if this weren't a test",
                "price_per_week": "99",
                "options": [
                    {
                        "name": "bed",
                        "price_per_week": "64",
                        "prechecked": "true"
                    },
                    {
                        "name": "lamp",
                        "price_per_week": "10",
                    },
                    {
                        "name": "chair",
                        "price_per_week": "45",
                    },
                    {
                        "name": "windows",
                        "price_per_week": "0",
                        "prechecked": "true"
                    }
                ]
            }

        ],
            "city": "24b0f0a4c1a1b1a100000001",
            "review_score": "0.3",
            "extra_fees": [
            {
                "name": "test fee",
                "amount": "123"
            },
            {
                "name": "test fee 2",
                "amount": "456"
            }
        ]}

        expect(resp).toEqual(expected);
    })

});

