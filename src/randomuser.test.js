const axios = require("axios");
const Utils = require("./utils");

const url = "https://randomuser.me";
let samples;

beforeAll(async () => {
    samples = await import("./sample/randomnuser.mjs");
});

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await axios.get(url + path);
    expect(response.status).toBe(200);
});

test("get /api", async () => {
    const path = "/api";
    const response = await axios.get(url + path);

    Utils.stdChecks(response);
    Utils.checkArray(response.data.results);
    Utils.checkProps(
        response.data.results[0],
        Object.keys(samples.default.results[0])
    );
});
