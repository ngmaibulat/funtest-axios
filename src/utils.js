const axios = require("axios");

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

    static ghGetUser(user) {
        if (!user) {
            throw new Error(
                "invalid arg user: ghGetUser(user): must be truthy"
            );
        }

        if (typeof user != "string") {
            throw new Error(
                "invalid arg user: ghGetUser(user): must be a string"
            );
        }

        const url = `https://api.github.com/users/${user}`;
        // const url = `https://api.github.com/gdfgsdfgdfsg`;

        const options = {
            headers: {
                "User-Agent": "curl/7.79.1",
                Accept: "application/vnd.github+json",
            },
        };

        return axios.get(url, options);
    }
}

// function expectSimplest(val1) {
//     const res = {
//         toBe: function (val2) {
//             if (val1 == val2) {
//                 return true;
//             } else {
//                 throw new Error(`Expected ${val1}, got ${val2}`);
//             }
//         },
//     };

//     return res;
// }

module.exports = Utils;
