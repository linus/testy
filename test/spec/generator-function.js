/**
 * Generator functions can be tested in a number of ways
 *
 * @template T
 * @param {T[]} values
 * @yields T
 * @example generateValues(["foo", "bar", "baz"]).next()
 * // Call .next() immediately to check the first value
 * //=> {
 *   value: "foo",
 *   done: false
 * }
 * @example Array.from(generateValues([42, 17]))
 * // Consume the iterator into an array, and test that
 * //=> [42, 17]
 * @example
 * // Assign the iterator to a variable and iterate as many steps as needed
 * const it = generateValues(["baz", "qux"]);
 * it.next();
 * it.next();
 * it.next();
 * //=> {
 *   value: undefined,
 *   done: true
 * }
 */
export function* generatorFunction(array) {
  for (const x of array) yield x;
}
