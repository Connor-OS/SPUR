import { describe, expect, test, jest } from '@jest/globals';
const app = require("../../app");
import request from "supertest";

describe("Index controller tests", () => {

    test(`renders the index page`, async () => {
        const resp = await request(app).get("/school").query({id: "67a866f87588ceddcdd7ce55"});

        expect(resp.status).toEqual(200);
        expect(resp.text).toContain("Birmingham International School");
        expect(resp.text).toContain("Beginner English");
        expect(resp.text).toContain("Stay with Family");
        expect(resp.text).toContain("Total to pay");
    });
});