import { stdChecks, checkArray, checkProps } from "./utils.js";
import samples from "./sample/reqres.mjs";

const url = "https://reqres.in";
const req = request(url);

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await req.get(path);
    expect(response.status).toBe(200);
});

test("get /api/users", async () => {
    const path = "/api/users";
    const response = await req.get(path);

    stdChecks(response);
    checkArray(response.body.data);
    checkProps(response.body.data, Object.keys(samples.user));
});

test("get /api/users/1", async () => {
    const path = "/api/users/1";
    const response = await req.get(path);

    stdChecks(response);
    // checkArray(response.body.data);
    checkProps(response.body.data, Object.keys(samples.user));
});

test("post /api/register", async () => {
    const path = "/api/register";
    const response = await req.post(path).send(samples.regdata);

    stdChecks(response);
    // checkArray(response.body.data);
    checkProps(response.body, Object.keys(samples.token));
});
