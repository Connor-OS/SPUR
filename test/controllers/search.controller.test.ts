import { describe, expect, test, jest } from '@jest/globals';
const app = require("../../app");
const get = require("../../controllers/search.controller").get
import {City, School} from "../../model/dataModel";
import {getSearchOptions} from "../../services/searchBar.service";

// This tells Jest to mock the entire module
jest.mock("../../model/dataModel", () => ({
    City: {
        findOne: jest.fn(),
    },
    School: {
        find: jest.fn()
    }
}));

jest.mock('../../services/searchBar.service', () => ({
    getSearchOptions: jest.fn(),
}));


describe("Search controller tests", () => {
    
    const req = {
        query: {
            language: "Learn English",
            city: "Newcastle",
            date: "31/12/1999 - 01/01/2000",
            age: "16+"
        }
    }

    const res = {
        render: jest.fn(),
    };

    // @ts-ignore
    (getSearchOptions as jest.Mock).mockResolvedValue({
        someOption: 'value',
    });

    test(`renders the search page`, async () => {

        const mockedCity = City as jest.Mocked<typeof City>;
        mockedCity.findOne.mockResolvedValue({ name: 'Berlin', id: 123 });


        const mockSchools = require('../mocks/mock_schools.json')
        const mockedSchool = School as {
            find: jest.Mock;
        };
        mockedSchool.find.mockReturnValue({
            // @ts-ignore
            lean: jest.fn().mockResolvedValue(mockSchools),
        });

        await get(req, res);
        expect(res.render).toHaveBeenCalledWith("search_results", expect.any(Object));
    })
})
