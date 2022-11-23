const axios = require("axios");
const Utils = require("./utils");

const url = "https://hacker-news.firebaseio.com";
const samplesPath = "./sample/ipinfo.mjs";
let samples;

const http = axios.create({
    baseURL: url,
    timeout: 3000,
    // timeout: 3,
    timeoutErrorMessage: "err::timeout",

    headers: {
        "User-Agent": "funtest/0.0.1",
        Accept: "application/json",
    },

    validateStatus: function (status) {
        return status < 600; // Resolve only if the status code is less than 500
    },
});

const sampleReply = `
HTTP/1.1 301 Moved Permanently
Server: nginx
Date: Wed, 23 Nov 2022 07:22:21 GMT
Content-Type: text/plain
Content-Length: 0
Connection: keep-alive
Access-Control-Allow-Origin: *
Location: https://console.firebase.google.com/project/firebase-hacker-news/database/hacker-news/data/
Strict-Transport-Security: max-age=31556926; includeSubDomains; preload
`;

beforeAll(async () => {
    samples = await import(samplesPath);
});

test(`connect ${url}`, async () => {
    const path = "/";
    let response = null;

    try {
        response = await http.get(path);
    } catch (e) {
        //Check for timeout
        const fullurl = url + path;

        if (e.message == "err::timeout") {
            const msg = `Timeout error for: ${fullurl}`;
            throw new Error(msg);
        }

        //Connection Aborted
        else if (e.code == "ECONNABORTED") {
            const msg = `ECONNABORTED error for: ${fullurl}`;
            throw new Error(msg);
        }

        //Other problem
        else {
            const msg = `${e.message} error for: ${fullurl}`;
            throw new Error(msg);
        }
    } finally {
        // don't put expect() calls here
        // as we need to see error message from catch block
    }

    expect([200, 301]).toContain(response.status);
});

test("get /v0/topstories.json", async () => {
    try {
        const path = "/v0/topstories.json";
        // const response = await http.get(path);

        // expect(response.status).toBe(200);
        // expect(response.statusText).toBe("OK");
        // expect(response.headers["content-type"]).toMatch(/application\/json/);
        // expect(response.headers["content-type"]).toMatch(/charset=utf-8/);

        // Utils.checkArray(response.data);
    } catch (e) {
        const data = e.request.data;
        console.log(data);
    }
});

// test("get /v0/newstories.json", async () => {
//     const path = "/v0/newstories.json";
//     const response = await http.get(path);

//     Utils.stdChecks(response);
//     Utils.checkArray(response.data);
// });

// test("get /v0/beststories.json", async () => {
//     const path = "/v0/beststories.json";
//     const response = await http.get(path);

//     Utils.stdChecks(response);
//     Utils.checkArray(response.data);
// });
