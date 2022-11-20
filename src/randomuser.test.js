import { stdChecks, checkArray, checkProps } from "./utils.js";
import samples from "./sample/ramdonuser.mjs";

const url = "https://randomuser.me";
const req = request(url);

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await req.get(path);
    expect(response.status).toBe(200);
});

test("get /api", async () => {
    const path = "/api";
    const response = await req.get(path);

    stdChecks(response);
    checkArray(response.body.results);
    checkProps(response.body.results[0], Object.keys(samples.reply.results[0]));
});
