#!/usr/bin/env node

import path from "node:path";
import util from "node:util";
import { chdir } from "node:process";
import { run } from "@aibulat/run";

const options = {
    config: {
        type: "string",
        short: "c",
    },
    mock: {
        type: "boolean",
        short: "m",
    },
};

const defaultConfig = {
    timeout: 2000,
    useragent: "curl/7.79.1",
};

async function runJest() {
    const nodever = parseInt(process.versions.node);

    if (nodever < 18) {
        console.error("You are using older version of NodeJS");
        process.exit(1);
    }

    const jsonUtil = await import("@aibulat/json");
    const isFile = (await import("@aibulat/isfile")).default;
    const fs = await import("fs/promises");

    const argObj = {
        args: process.argv.slice(2),
        options: options,
    };
    const { values, positionals } = util.parseArgs(argObj);

    // if (!values.config) {
    //     console.error("Please provide config file via option:");
    //     console.error("\t--config <filename>");
    //     process.exit(1);
    // }

    if (values.config) {
        //check that file:values.config exists
        const configFound = await isFile(values.config);
        if (!configFound) {
            console.error(`config file not found: ${values.config}`);
            process.exit(1);
        }

        //read json from file
        const data = await jsonUtil.readJson(values.config);

        //put configs for env var
        process.env.FUNTEST_TIMEOUT = data.timeout || defaultConfig.timeout;
        process.env.FUNTEST_USERAGENT =
            data.useragent || defaultConfig.useragent;
    }
    //no config
    //using default values
    else {
        process.env.FUNTEST_TIMEOUT = defaultConfig.timeout;
        process.env.FUNTEST_USERAGENT = defaultConfig.useragent;
    }

    //put node_options env var
    process.env.NODE_OPTIONS = "--experimental-vm-modules --no-warnings";

    //check internet connection
    //check dns

    const selfPath = process.argv[1];
    const npxMode = selfPath.match(/\.bin/);
    if (npxMode) {
        console.log("npx mode");
        const prjPath = path.resolve(selfPath, "../..");
        chdir(prjPath);
        await fs.cp("node_modules/@aibulat/funtest-axios/", ".", {
            recursive: true,
        });
        //cp -fr node_modules/@aibulat/funtest-axios .
    }

    //run jest
    //npx jest --verbose
    const program = "npx";
    const args = ["jest", "--verbose"];
    const cmd = run(program, args);
}

runJest();
