import { jest, describe, expect, test } from "@jest/globals";
import request from "supertest";

export function stdChecks(response: request.Response) {
    expect(response.type).toBe("application/json");
    expect(response.charset).toBe("utf-8");
    expect(response.status).toBe(200);
    expect(response.ok).toBe(true);
    expect(response.redirect).toBe(false);
}

export function checkArray(something: any) {
    expect(Array.isArray(something)).toBe(true);
}

export function checkProps(response: any, props: string[]) {
    if (Array.isArray(response)) {
        for (const prop of props) {
            expect(response[0]).toHaveProperty(prop);
        }
    } else {
        for (const prop of props) {
            expect(response).toHaveProperty(prop);
        }
    }
}
