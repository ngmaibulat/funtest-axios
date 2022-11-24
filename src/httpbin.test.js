const axios = require("axios");
const Utils = require("./utils");

const url = "https://httpbin.org";
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
    const response = await http.get("/");
    expect(response.status).toBe(200);
});

test("get /uuid", async () => {
    const response = await http.get("/uuid");

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.headers["content-type"]).toBe("application/json");

    expect(response.headers["access-control-allow-origin"]).toBeDefined();

    Utils.checkProps(response.data, ["uuid"]);
});

test("get /headers", async () => {
    const response = await http.get("/headers");

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.headers["content-type"]).toBe("application/json");

    expect(response.headers["access-control-allow-origin"]).toBeDefined();

    Utils.checkProps(response.data, ["headers"]);
});

test("get /ip", async () => {
    const response = await http.get("/ip");

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.headers["content-type"]).toBe("application/json");

    expect(response.headers["access-control-allow-origin"]).toBeDefined();

    Utils.checkProps(response.data, ["origin"]);
});

test("get /user-agent", async () => {
    const response = await http.get("/user-agent");

    expect(response.status).toBe(200);
    expect(response.statusText).toBe("OK");
    expect(response.headers["content-type"]).toBe("application/json");
    // expect(response.headers["content-type"]).toMatch(/charset=utf-8/);

    expect(response.headers["access-control-allow-origin"]).toBeDefined();

    Utils.checkProps(response.data, ["user-agent"]);
});
