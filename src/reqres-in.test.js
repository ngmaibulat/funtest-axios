const axios = require("axios");
const Utils = require("./utils");

const url = "https://reqres.in";
let samples;

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

beforeAll(async () => {
    samples = await import("./sample/reqres.mjs");
});

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await http.get(path);
    expect(response.status).toBe(200);
});

test("get /api/users", async () => {
    const path = "/api/users";
    const response = await http.get(path);

    Utils.stdChecks(response);
    Utils.checkArray(response.data.data);
    Utils.checkProps(response.data.data, Object.keys(samples.user));
});

test("get /api/users/1", async () => {
    const path = "/api/users/1";
    const response = await http.get(path);

    Utils.stdChecks(response);
    // checkArray(response.body.data);
    Utils.checkProps(response.data.data, Object.keys(samples.user));
});

test("post /api/register", async () => {
    const path = "/api/register";
    const response = await http.post(path, samples.regdata);

    Utils.stdChecks(response);
    // checkArray(response.body.data);
    Utils.checkProps(response.data, Object.keys(samples.token));
});
