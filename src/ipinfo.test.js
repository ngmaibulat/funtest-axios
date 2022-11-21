const axios = require("axios");
const Utils = require("./utils");

const url = "https://ipinfo.io";
const samplesPath = "./sample/ipinfo.mjs";
let samples;

beforeAll(async () => {
    samples = await import(samplesPath);
});

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await axios.get(url + path);
    expect(response.status).toBe(200);
});

test("get /8.8.8.8", async () => {
    const path = "/8.8.8.8";
    const response = await axios.get(url + path);

    Utils.stdChecks(response);
    Utils.checkProps(response.data, Object.keys(samples.reply));
});
