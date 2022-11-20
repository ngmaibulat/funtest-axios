// import { jest, describe, expect, test } from "@jest/globals";
import request from "supertest";
import { stdChecks, checkArray, checkProps } from "./utils.js";

const url = "https://hacker-news.firebaseio.com";
const req = request(url);

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await req.get(path);
    expect(response.status).toBe(301);
});

test("get /v0/topstories.json", async () => {
    const path = "/v0/topstories.json";
    const response = await req.get(path);

    stdChecks(response);
    checkArray(response.body);
});

test("get /v0/newstories.json", async () => {
    const path = "/v0/newstories.json";
    const response = await req.get(path);

    stdChecks(response);
    checkArray(response.body);
});

test("get /v0/beststories.json", async () => {
    const path = "/v0/beststories.json";
    const response = await req.get(path);

    stdChecks(response);
    checkArray(response.body);
});
