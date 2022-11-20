const axios = require("axios");

const url = "https://randomuser.me";
let utils, samples;

beforeAll(async () => {
    const utilsmod = await import("./utils.mjs");
    samples = await import("./sample/ramdonuser.mjs");
    utils = utilsmod.Utils;
});

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await axios.get(url + path);
    expect(response.status).toBe(200);
});

test("get /api", async () => {
    const path = "/api";
    const response = await axios.get(url + path);

    utils.stdChecks(response);
    utils.checkArray(response.data.results);
    utils.checkProps(
        response.data.results[0],
        Object.keys(samples.default.results[0])
    );
});
