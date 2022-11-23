const axios = require("axios");
const Utils = require("./utils");

const url = "https://jsonplaceholder.typicode.com";
const samplesPath = "./sample/jsonplaceholder.mjs";
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
    samples = await import(samplesPath);
});

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await http.get(path);
    expect(response.status).toBe(200);
});

test("get /users", async () => {
    const path = "/users";
    const response = await http.get(path);
    Utils.stdChecks(response);
    Utils.checkArray(response.data);
    Utils.checkProps(response.data, Object.keys(samples.user));
});

test("get /posts", async () => {
    const path = "/posts";
    const response = await http.get(path);
    Utils.stdChecks(response);
    Utils.checkArray(response.data);
    Utils.checkProps(response.data, Object.keys(samples.post));
});

test("get /comments", async () => {
    const path = "/comments";
    const response = await http.get(path);
    Utils.stdChecks(response);
    Utils.checkArray(response.data);
    Utils.checkProps(response.data, Object.keys(samples.comment));
});
