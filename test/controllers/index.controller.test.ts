import { describe, expect, test, jest } from '@jest/globals';
const app = require("../../app");
import request from "supertest";

describe("Index controller tests", () => {

    test(`renders the index page`, async () => {
        const resp = await request(app).get("/");

        expect(resp.status).toEqual(200);
        expect(resp.text).toContain("Learn English");
        expect(resp.text).toContain("Why <b>SPUR</b> is the best option?");
        expect(resp.text).toContain("What <b>clients say</b>");
    });
        
    test( `successful post from index redirects to search result`, async () => {
        const resp = await request(app).post("/").send(
            { language: "Learn English" ,
            city: "Newcastle",
            date: "31/12/1999 - 01/01/2000",
            age: "16+"});

        expect(resp.status).toEqual(302);
        expect(resp.header.location).toEqual("search");
    })

    test( `unsuccessful post from index redirects to back to itself result. Incomplete search body`, async () => {
        const resp = await request(app).post("/").send(
            { language: "" ,
                city: "",
                date: "",
                age: ""});

        expect(resp.status).toEqual(302);
        expect(resp.header.location).toEqual("/");
    })
})