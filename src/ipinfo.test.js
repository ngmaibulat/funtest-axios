import { stdChecks, checkArray, checkProps } from "./utils.js";
import samples from "./sample/ipinfo.mjs";

const url = "https://ipinfo.io";
const req = request(url);

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await req.get(path);
    expect(response.status).toBe(200);
});

test("get /8.8.8.8", async () => {
    const path = "/8.8.8.8";
    const response = await req.get(path);

    stdChecks(response);
    checkProps(response.body, Object.keys(samples.reply));
});
