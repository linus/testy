// @ts-ignore
import jsdoc from "jsdoc-api";
import { expect } from "chai";
import { evalExpected, getTests, runTest, importPath } from "./lib.js";

/**
 * The main entry point. Call it with the path to the file to test, and run it
 * using Mocha.
 *
 * @typedef {{instance: any}} Options
 *
 * @param {string} file
 * @example testy("src/lib.js")
 */
export function testy(file) {
  const doc = jsdoc.explainSync({ files: [file] });

  const tests = getTests(doc);

  describe(file, () => {
    for (const { path, functionName, offset, examples } of tests) {
      /** @type {any} */
      let context;
      before(async () => {
        context = await import(pathToFileURL(path).href);
      });

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
              else expect(actual.reason).to.eql(expected.reason);
            } else if (expected.status === "fulfilled") {
              expect(actual.value).to.eql(expected.value);
            } else {
              expect(actual.value).to.eql(expected.reason);
            }
          });
        }
      });
    }
  });
}
