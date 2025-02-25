import { describe, expect, test, jest } from '@jest/globals';
const app = require("../../app");
const get = require("../../controllers/search.controller").get
import request from "supertest";



describe("Search controller tests", () => {
    
    const req = {
        session: {
            searchData: {
                language: "Learn English",
                city: "Newcastle",
                date: "31/12/1999 - 01/01/2000",
                age: "16+"
            }
        }
    }

    const res = {
        render: jest.fn(),
    };
    
    test(`renders the search page`, async () => {
        await get(req, res);
        expect(res.render).toHaveBeenCalledWith("search_results", expect.any(Object));
    })
})
