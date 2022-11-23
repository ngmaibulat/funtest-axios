const axios = require("axios");
const Utils = require("./utils");

const url = "https://randomuser.me";
let samples;

beforeAll(async () => {
    samples = await import("./sample/randomnuser.mjs");
});

const http = axios.create({
    baseURL: url,
    timeout: 1000,
    headers: {
        "User-Agent": "funtest/0.0.1",
        Accept: "application/json",
    },

    validateStatus: function (status) {
        return status < 600; // Resolve only if the status code is less than 500
    },
});

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await http.get(path);
    expect(response.status).toBe(200);
});

test("get /api", async () => {
    const path = "/api";
    const response = await http.get(path);

    Utils.stdChecks(response);
    Utils.checkArray(response.data.results);
    Utils.checkProps(
        response.data.results[0],
        Object.keys(samples.default.results[0])
    );
});
