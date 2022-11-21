const axios = require("axios");
const Utils = require("./utils");

/*
if Axios exceptions are not handled: Jest might end up with its own Exception
while trying to print out the Exception info to console
That happens while doing JSON.stringify for object
having circular structure

Node.js v18.11.0
node:internal/child_process/serialization:159
    const string = JSONStringify(message) + '\n';
                   ^

TypeError: Converting circular structure to JSON
    --> starting at object with constructor 'Object'
    |     property 'socket' -> object with constructor 'Object'
    --- property '_httpMessage' closes the circle
    at stringify (<anonymous>)
    at writeChannelMessage (node:internal/child_process/serialization:159:20)
    at process.target._send (node:internal/child_process:838:17)
    at process.target.send (node:internal/child_process:738:19)
    at reportSuccess (/Users/ngmaibulat/projects/packages/_apitest/funtest-axios/node_modules/jest-worker/build/workers/processChild.js:63:11)


    Hense, you have 2 options:
        1. Handle exceptions
        2. Use ValidateStatus function

1. Handling Exceptions:

    let response;
    try {
        response = await http.get("/");
    } catch (e) {
        response = e.response;
    } finally {
        expect(response.status).toBe(200);
    }

2. Validate Status:

    const http = axios.create({
        baseURL: "https://api.github.com",
        timeout: 1000,
        headers: { "User-Agent": "curl/7.79.1" },

        validateStatus: function (status) {
            return status < 600; // Resolve only if the status code is less than 500
        },
    });

*/

const samplesPath = "./sample/github.mjs";
let samples;

const http = axios.create({
    baseURL: "https://api.github.com",
    timeout: 1000,
    headers: { "User-Agent": "curl/7.79.1" },

    validateStatus: function (status) {
        return status < 600; // Resolve only if the status code is less than 500
    },
});

beforeAll(async () => {
    samples = await import(samplesPath);
});

test(`connect https://api.github.com`, async () => {
    let response = {};

    try {
        response = await http.get("/");
    } catch (e) {
        response = e.response;
    } finally {
        expect(response.status).toBe(200);
    }
});

test(`connect https://api.github.com: no Exceptions`, async () => {
    const response = await http.get("/");

    if (response.status != 200) {
        throw new Error("Fail test via throwing Error");
    }
});

test("get /users/octocat", async () => {
    let response = {};
    try {
        response = await Utils.ghGetUser("octocat");
    } catch (e) {
        response = e.response;
    } finally {
        expect(response.status).toBe(200);
        Utils.stdChecks(response);
        Utils.checkProps(response.data, Object.keys(samples.user));
    }
});

test("throw Error on username being falsy", () => {
    function badCode() {
        Utils.ghGetUser(null);
    }

    expect(badCode).toThrowError();
});

test("throw Error on typeof(username) != string", () => {
    function badCode() {
        Utils.ghGetUser(true);
    }

    expect(badCode).toThrowError();
});

test("throw Error in async function: async/await", async () => {
    async function badCode() {
        throw new Error("bad code!");
        // return Promise.reject("bad code!");
    }

    try {
        await badCode();
    } catch (e) {
        expect(e.message).toMatch(/bad/);
    }
});

test("throw Error in async function: async/await + Promise.reject()", async () => {
    async function badCode() {
        // throw new Error("bad code!");
        const err = new Error("bad code!");
        return Promise.reject(err);
    }

    try {
        await badCode();
    } catch (e) {
        expect(e.message).toMatch(/bad/);
    }
});

test("throw Error in async function: expect rejects", async () => {
    async function badCode() {
        throw new Error("bad code!");
        // return Promise.reject("bad code!");
    }

    expect(badCode()).rejects.toThrowError(); //can call badCode() as it returns Promise
    expect(badCode).rejects.toThrowError();
    expect(badCode).rejects;
});
