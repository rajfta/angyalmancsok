import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const readJson = (path) =>
	JSON.parse(readFileSync(new URL(path, import.meta.url), "utf8"));
const installed = (pkg) =>
	readJson(`../node_modules/${pkg}/package.json`).version;
const declaredMin = (pkg) => {
	const { dependencies = {}, devDependencies = {} } =
		readJson("../package.json");
	return (dependencies[pkg] ?? devDependencies[pkg]).replace(/^[\^~>=]+/, "");
};
const atLeast = (version, [major, minor]) => {
	const [ma, mi] = version.split(".").map(Number);
	return ma > major || (ma === major && mi >= minor);
};

// TinaCloud's WorkOS auth (Nov 2026) returns 403 to clients below 3.12
test("installed tinacms supports TinaCloud login (>= 3.12)", () => {
	assert.ok(atLeast(installed("tinacms"), [3, 12]), installed("tinacms"));
});

test("package.json cannot resolve tinacms below 3.12", () => {
	assert.ok(atLeast(declaredMin("tinacms"), [3, 12]), declaredMin("tinacms"));
});

test("@tinacms/cli is upgraded alongside tinacms (>= 2.0)", () => {
	assert.ok(
		atLeast(installed("@tinacms/cli"), [2, 0]),
		installed("@tinacms/cli"),
	);
});
