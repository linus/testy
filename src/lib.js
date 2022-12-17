// @ts-ignore
import vm from "node:vm";
// @ts-ignore
import fs from "node:fs/promises";

/**
 * @typedef {{
 *   examples: string[],
 *   meta: {
 *     path: string,
 *     filename: string,
 *     lineno: number,
 *     columnno: number
 *   },
 *   name: string
 * }} Doclet
 *
 * @typedef {{
 *   line: number,
 *   column: number
 * }} Offset
 *
 * @typedef {{
 *   test: string,
 *   example: string,
 *   expected: string
 * }} Example
 *
 * @typedef {{
 *   path: string,
 *   functionName: string,
 *   offset: Offset,
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
 *     filename: "index.js",
 *     lineno: 10,
 *     columnno: 0
 *   },
 *   name: "Math.max"
 * }])
 * //=> [
 *   {
 *     path: "/tmp/index.js",
 *     functionName: "Math.max",
 *     offset: {
 *       line: 10,
 *       column: 0
 *     },
 *     examples: [{
 *       test: "Math.max(1, 3)",
 *       example: "Math.max(1, 3)\n//=> 3",
 *       expected: "3"
 *     }]
 *   }
 * ]
 */
export function getTests(doc) {
  return (
    doc
      // Find all the doclets containing examples
      .filter(({ examples }) => Array.isArray(examples))
      .map((doc) => {
        // Take the examples with the test source, the entire example, and the expected result
        const examples = doc.examples
          .map((example) => {
            const [test, expected] = example.split(/^\s*\/\/\s*=>\s*/m, 2);

            return {
              test: test.trim(),
              example,
              expected,
            };
          })
          .filter(
            ({ test, expected }) =>
              typeof test === "string" && typeof expected === "string"
          );

        return {
          ...doc,
          examples,
        };
      })
      .filter(({ examples }) => examples.length > 0)
      // Collect the tests together with the file path and the function name
      .map(
        ({
          meta: { path: directory, filename, lineno: line, columnno: column },
          name: functionName,
          examples,
        }) => {
          const path = new URL(
            `${directory}/${filename}`.replaceAll("\\", "/"),
            "file:"
          ).pathname;

          return {
            path,
            functionName,
            offset: { line, column },
            examples,
          };
        }
      )
  );
}

/**
 * @param {string} path Path to the file under test
 * @param {string} test The test source
 * @param {Offset} offset The test source's line and column offset
 * @returns {Promise.<any>} The result of the evaluated test
 * @example runTest("./lib.js", "1 - 2")
 * //=> -1
 * @example runTest("./lib.js", "runTest('./lib.js', '1 + 2')")
 * //=> 3
 */
export async function runTest(
  path,
  test,
  { line: lineOffset, column: columnOffset } = { line: 0, column: 0 }
) {
  const context = await import(path);
  return vm.runInNewContext(
    test,
    { fs, ...context },
    {
      filename: path,
      lineOffset,
      columnOffset,
    }
  );
}

/**
 * @param {string} path Path to the file under test
 * @param {string} expected The expected result source
 * @param {Offset} offset The test source's line and column offset
 * @returns {Promise.<any>} The result of the evaluated test
 * @example evalExpected("./lib.js", "1 - 2")
 * //=> -1
 * @example evalExpected("./lib.js", "throw new Error('qux')")
 * //=> throw new Error("qux")
 * @example evalExpected("./lib.js", "{foo: 17, bar: 4711}")
 * //=> {
 *   foo: 17,
 *   bar: 4711
 * }
 * @example evalExpected("./lib.js", "[17, 'foo', 4711]")
 * //=> [17, "foo", 4711]
 * @example evalExpected("./lib.js", "new Set([42, 17])")
 * //=> new Set([42, 17])
 */
export async function evalExpected(
  path,
  expected,
  { line: lineOffset, column: columnOffset } = { line: 0, column: 0 }
) {
  const source = expected.startsWith("throw ")
    ? `{${expected}}`
    : `(${expected})`;
  return vm.runInNewContext(source, undefined, {
    filename: path,
    lineOffset,
    columnOffset,
  });
}
