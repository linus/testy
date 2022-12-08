// @ts-ignore
import jsdoc from "jsdoc-api";
import { expect } from "chai";
import { getTests, runTest } from "./lib.js";

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
    for (const { path, functionName, examples } of tests) {
      describe(functionName, () => {
        for (const { test, example, result: expected } of examples) {
          it(example, async () => {
            const actual = await runTest(path, test);
            expect(actual).to.eql(expected);
          });
        }
      });
    }
  });
}
