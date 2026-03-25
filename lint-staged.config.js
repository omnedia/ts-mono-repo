const path = require("path");

function buildCommands(scope, files) {
    const scoped = files
        .filter((f) => f.startsWith(`${scope}/`))
        .map((f) => path.relative(scope, f));

    if (scoped.length === 0) return [];

    const fileList = scoped.join(" ");

    return [
        `cd ${scope} && npx prettier --write ${fileList}`,
        `cd ${scope} && npx eslint --fix ${fileList}`,
    ];
}

module.exports = {
    "**/*.{js,ts,jsx,tsx,json,css,md}": (files) => [
        ...buildCommands("backend", files),
        ...buildCommands("frontend", files),
    ],
};