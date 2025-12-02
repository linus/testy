// @ts-ignore
import jsdoc from "jsdoc-api";
import { evalExpected, getTests, runTest, importPath } from "./lib.js";
import { describe, it, before } from "node:test";
import assert from "node:assert";

/**
 * The main entry point. Call it with the path to the file to test, and run it
 * using Mocha.
 * @param {string} file Path to the file under test
 * @example testy("src/lib.js")
 */
export function testy(file) {
  const doc = jsdoc.explainSync({ files: [file] });

  const tests = getTests(doc);

  describe(file, () => {
    /** @type {any} */
    let context;
    before(async () => {
      context = await importPath(file);
    });

    for (const { path, functionName, offset, examples } of tests) {
      describe(functionName, () => {
        for (const { test, example, expected: result } of examples) {
          it(example, async () => {
            const [actual, expected] = await Promise.allSettled([
              runTest(path, test, offset, context),
              evalExpected(path, result, offset),
            ]);
            if (actual.status === "rejected") {
              // If the example was rejected, and that's unexpected, then we should notify someone
              if (expected.status !== "rejected") throw actual.reason;
              // Else - Aha! We expected this! Make sure it's identical:
              else assert.deepEqual(actual.reason, expected.reason);
            } else if (expected.status === "fulfilled") {
              assert.deepEqual(actual.value, expected.value);
            } else {
              assert.deepEqual(actual.value, expected.reason);
            }
          });
        }
      });
    }
  });
}
