const axios = require("axios");

const url = "https://reqres.in";
let utils, samples;

beforeAll(async () => {
    const utilsmod = await import("./utils.mjs");
    samples = await import("./sample/reqres.mjs");
    utils = utilsmod.Utils;
});

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await axios.get(url + path);
    expect(response.status).toBe(200);
});

test("get /api/users", async () => {
    const path = "/api/users";
    const response = await axios.get(url + path);

    stdChecks(response);
    checkArray(response.data.data);
    checkProps(response.data.data, Object.keys(samples.user));
});

test("get /api/users/1", async () => {
    const path = "/api/users/1";
    const response = await axios.get(url + path);

    stdChecks(response);
    // checkArray(response.body.data);
    checkProps(response.data.data, Object.keys(samples.user));
});

test("post /api/register", async () => {
    const path = "/api/register";
    const response = await axios.post(url + path).send(samples.regdata);

    stdChecks(response);
    // checkArray(response.body.data);
    checkProps(response.body, Object.keys(samples.token));
});
