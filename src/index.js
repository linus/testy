// @ts-ignore
import jsdoc from "jsdoc-api";
import { expect } from "chai";
import { evalExpected, getTests, runTest } from "./lib.js";

/**
 * The main entry point. Call it with the path to the file to test, and run it
 * using Mocha.
 *
 * @param {string} file
 * @example testy("src/lib.js")
 * //=> undefined
 */
export function testy(file) {
  const doc = jsdoc.explainSync({ files: [file] });

  const tests = getTests(doc);

  describe(file, () => {
    for (const { path, functionName, offset, examples } of tests) {
      describe(functionName, () => {
        for (const { test, example, expected: result } of examples) {
          it(example, async () => {
            const [actual, expected] = await Promise.allSettled([
              runTest(path, test, offset),
              evalExpected(path, result, offset),
            ]);
            if (actual.status === "rejected") {
              // @ts-ignore
              // If the actual status was rejected, we assume so was expected.
              // Otherwise, it's a test failure
              expect(actual.reason).to.eql(expected.reason);
            } else {
              // @ts-ignore
              expect(actual.value).to.eql(expected.value);
            }
          });
        }
      });
    }
  });
}
