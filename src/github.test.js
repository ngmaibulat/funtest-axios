const axios = require("axios");
const Utils = require("./utils");

/*
if Axios exception is not handled: Jest might end up with its own Exception
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


    Hense, using the following code:

    let response;
    try {
        response = await http.get("/");
    } catch (e) {
    } finally {
        expect(response.status).toBe(200);
    }

    In general, axios seems to be less convienent to use for API testing
    compared to SuperTest, Fetch. As it throws Exceptions instead of just
    giving result codes and let the caller decide if those should really thrown.
    For usual application code, Axios approach (mostly) convinient.
    But not for testing or low-level code.
*/

const samplesPath = "./sample/github.mjs";
let samples;

const http = axios.create({
    baseURL: "https://api.github.com",
    timeout: 1000,
    headers: { "User-Agent": "curl/7.79.1" },
});

beforeAll(async () => {
    samples = await import(samplesPath);
});

test(`connect https://api.github.com`, async () => {
    let response = {};
    try {
        response = await http.get("/");
    } catch (e) {
    } finally {
        expect(response.status).toBe(200);
    }
});

test("get /users/octocat", async () => {
    let response = {};
    try {
        response = await Utils.ghGetUser("octocat");
    } catch (e) {
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

test("throw Error in async function: expect rejects", async () => {
    async function badCode() {
        throw new Error("bad code!");
        // return Promise.reject("bad code!");
    }

    expect(badCode()).rejects.toThrowError(); //can call as it returns Promise
    expect(badCode).rejects.toThrowError();
});
