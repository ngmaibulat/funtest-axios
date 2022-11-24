### Using Axios/Jest/CJS to make tests for some publicly available REST APIs

### Notes

- This package is not intended to be used as a library.
- Rather published referense code, which can be easily run
- I might consider extracting some of techniques used here and create a tiny library later.

### Warning on Node version

- Use node version 18 or later!
- Node-18 is the current LTS version, suitable for most users
- Node-18 will be supported till 2025-04-30
- Previous LTS version Node-16 now under `Maintenance` mode
- Support for Node-16 would end in less than a year: 2023-09-11
- See: https://github.com/nodejs/release#release-schedule
- Release info in json: https://github.com/nodejs/Release/blob/main/schedule.json

### Why

- Test that referense public API are actually usable from your location
- Can be used as sample code on how to write basic tests for REST API
- You can use it as a sort of traffic generator ))

### Using:

```sh
npx @aibulat/funtest-axios@latest
```

### Stack:

- Javascript/CJS
- Axios HTTP client
- Jest test runner

### Other packages

- I have a similar package which uses TS/ESM/Jest/Supertest for same task: `@aibulat/funtest`
