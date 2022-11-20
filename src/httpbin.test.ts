// import { jest, describe, expect, test } from "@jest/globals";
import request from "supertest";
import { stdChecks, checkArray, checkProps } from "./utils.js";

const url = "https://httpbin.org";
const req = request(url);

test(`connect ${url}`, async () => {
    const path = "/";
    const response = await req.get(path);
    expect(response.status).toBe(200);
});

test("get /uuid", async () => {
    const path = "/uuid";
    const acceptHeader = "application/json";
    const response = await req.get(path).set("Accept", acceptHeader);

    expect(response.type).toBe("application/json");
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
    expect(response.redirect).toBe(false);

    checkProps(response.body, ["uuid"]);
});

test("get /headers", async () => {
    const path = "/headers";
    const acceptHeader = "application/json";
    const response = await req.get(path).set("Accept", acceptHeader);

    expect(response.type).toBe("application/json");
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
    expect(response.redirect).toBe(false);

    checkProps(response.body, ["headers"]);
});

test("get /ip", async () => {
    const path = "/ip";
    const acceptHeader = "application/json";
    const response = await req.get(path).set("Accept", acceptHeader);

    expect(response.type).toBe("application/json");
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
    expect(response.redirect).toBe(false);

    checkProps(response.body, ["origin"]);
});

test("get /user-agent", async () => {
    const path = "/user-agent";
    const acceptHeader = "application/json";
    const response = await req.get(path).set("Accept", acceptHeader);

    expect(response.type).toBe("application/json");
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
    expect(response.redirect).toBe(false);

    checkProps(response.body, ["user-agent"]);
});
