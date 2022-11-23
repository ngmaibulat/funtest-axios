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

    // console.log(values.config);
    // console.log(values.mock);

    //read json from file
    const data = await jsonUtil.readJson(values.config);
    console.log(data);

    //check internet connection
    //check dns
    //put configs for env var
    //put node_options env var
    //run jest
}

run();
