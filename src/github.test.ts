// import { jest, describe, expect, test } from "@jest/globals";
import request from "supertest";
import { stdChecks, checkArray, checkProps } from "./utils.js";
import samples from "./sample/github.js";

const url = "https://api.github.com";
const req = request(url);

async function getUser(user: string) {
    const acceptHeader = "application/vnd.github+json";
    const path = `/users/${user}`;
    const useragent = "curl/7.79.1";

    const response = await req
        .get(path)
        .set("Accept", acceptHeader)
        .set("User-Agent", useragent);

    return response;
}

test(`connect ${url}`, async () => {
    const path = "/";
    const useragent = "curl/7.79.1";
    const response = await req.get(path).set("User-Agent", useragent);

    expect(response.status).toBe(200);
});

test("get /users/octocat", async () => {
    const response = await getUser("octocat");
    expect(response.status).toBe(200);

    stdChecks(response);
    checkProps(response.body, Object.keys(samples.user));
});
