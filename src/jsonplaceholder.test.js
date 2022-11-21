const axios = require("axios");
const Utils = require("./utils");

const url = "https://jsonplaceholder.typicode.com";
const samplesPath = "./sample/jsonplaceholder.mjs";
let samples;

beforeAll(async () => {
    samples = await import(samplesPath);
});

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await axios.get(url + path);
    expect(response.status).toBe(200);
});

test("get /users", async () => {
    const path = "/users";
    const response = await axios.get(url + path);
    Utils.stdChecks(response);
    Utils.checkArray(response.data);
    Utils.checkProps(response.data, Object.keys(samples.user));
});

test("get /posts", async () => {
    const path = "/posts";
    const response = await axios.get(url + path);
    Utils.stdChecks(response);
    Utils.checkArray(response.data);
    Utils.checkProps(response.data, Object.keys(samples.post));
});

test("get /comments", async () => {
    const path = "/comments";
    const response = await axios.get(url + path);
    Utils.stdChecks(response);
    Utils.checkArray(response.data);
    Utils.checkProps(response.data, Object.keys(samples.comment));
});
