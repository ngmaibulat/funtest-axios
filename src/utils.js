class Utils {
    static stdChecks(response) {
        expect(response.status).toBe(200);
        expect(response.statusText).toBe("OK");
        expect(response.headers["content-type"]).toMatch(/application\/json/);
        expect(response.headers["content-type"]).toMatch(/charset=utf-8/);

        // expect(response.redirect).toBe(false);
    }

    static checkArray(something) {
        expect(Array.isArray(something)).toBe(true);
    }

    static checkProps(response, props) {
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
}

module.exports = Utils;
