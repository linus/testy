// @ts-ignore
import vm from "node:vm";
// @ts-ignore
import fs from "node:fs/promises";

/**
 * @typedef {{
 *   examples: string[],
 *   meta: {
 *     path: string,
 *     filename: string
 *   },
 *   name: string
 * }} Doclet
 *
 * @typedef {{
 *   test: string,
 *   example: string,
 *   result: any
 * }} Example
 *
 * @typedef {{
 *   path: string,
 *   functionName: string,
 *   examples: Example[]
 * }} TestDefinition
 */

/**
 * Map a [doclet][doclet] to a list of test definitions with their results
 * evaluated.
 *
 * [doclet]: https://jsdoc.app/about-plugins.html#event-newdoclet
 *
 * @param {Doclet[]} doc The doclet from the file under test
 * @returns {TestDefinition[]} The test definitions parsed from the doclet, if any
 * @example getTests([{
 *   examples: ["Math.max(1, 3)\n//=> 3"],
 *   meta: {
 *     path: "/tmp",
 *     filename: "index.js"
 *   },
 *   name: "Math.max"
 * }])
 * //=> [
 *   {
 *     path: "/tmp/index.js",
 *     functionName: "Math.max",
 *     examples: [{
 *       test: "Math.max(1, 3)",
 *       example: "Math.max(1, 3)\n//=> 3",
 *       result: 3
 *     }]
 *   }
 * ]
 */
export function getTests(doc) {
  return (
    doc
      // Find all the doclets containing examples
      .filter(({ examples }) => Array.isArray(examples))
      // Collect the tests together with the file path and the function name
      .map(
        ({
          meta: { path: directory, filename },
          name: functionName,
          examples: exampleSources,
        }) => {
          const path = `${directory}/${filename}`;
          // Take the examples with the test source, the entire example, and the evaluated result
          const examples = exampleSources.map((example) => {
            const [test, expected] = example.split(/^\s*\/\/\s*=>\s*/m, 2);

            return {
              test: test.trim(),
              example,
              result: vm.runInNewContext(`(${expected})`, undefined, {
                filename: path,
              }),
            };
          });

          return {
            path,
            functionName,
            examples,
          };
        }
      )
  );
}

/**
 * @param {string} path Path to the file under test
 * @param {string} test The test source
 * @returns {Promise.<any>} The result of the evaluated test
 * @example runTest("./lib.js", "1 - 2")
 * //=> -1
 * @example runTest("./lib.js", "runTest('./lib.js', '1 + 2')")
 * //=> 3
 */
export async function runTest(path, test) {
  const context = await import(path);
  return vm.runInNewContext(
    test,
    { fs, ...context },
    {
      filename: path,
    }
  );
}
