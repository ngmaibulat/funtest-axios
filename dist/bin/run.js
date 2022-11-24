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
    timeout: 1500,
    useragent: "curl/7.79.1",
};

async function run() {
    const nodever = parseInt(process.versions.node);

    if (nodever < 18) {
        console.error("You are using older version of NodeJS");
        process.exit(1);
    }

    const util = await import("node:util");
    const jsonUtil = await import("@aibulat/json");
    const isFile = (await import("@aibulat/isfile")).default;
    const fs = await import("fs/promises");

    const argObj = {
        args: process.argv.slice(2),
        options: options,
    };
    const { values, positionals } = util.parseArgs(argObj);

    if (!values.config) {
        console.error("Please provide config file via option:");
        console.error("\t--config <filename>");
        process.exit(1);
    }

    //check that file:values.config exists
    const configFound = await isFile(values.config);
    if (!configFound) {
        console.error(`config file not found: ${values.config}`);
        process.exit(1);
    }

    //read json from file
    const data = await jsonUtil.readJson(values.config);
    console.log(data.timeout);
    console.log(data.useragent);

    //put configs for env var
    process.env.FUNTEST_TIMEOUT = data.timeout || defaultConfig.timeout;
    process.env.FUNTEST_USERAGENT = data.useragent || defaultConfig.useragent;

    //put node_options env var
    process.env.NODE_OPTIONS = "--experimental-vm-modules --no-warnings";

    //check internet connection
    //check dns

    //run jest
}

run();
