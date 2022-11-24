const axios = require("axios");
const Utils = require("./utils");

const url = "https://ipinfo.io";
const samplesPath = "./sample/ipinfo.mjs";
let samples;

const http = axios.create({
    baseURL: url,
    timeout: +process.env.FUNTEST_TIMEOUT || 2000,
    timeoutErrorMessage: "err::timeout",

    headers: {
        "User-Agent": process.env.FUNTEST_USERAGENT || "curl/7.79.1",
        Accept: "application/json",
        "Accept-Encoding": "application/json",
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

test("get /8.8.8.8", async () => {
    const path = "/8.8.8.8";
    const response = await http.get(path);

    Utils.stdChecks(response);
    Utils.checkProps(response.data, Object.keys(samples.reply));
});
