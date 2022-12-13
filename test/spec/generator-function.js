/**
 * Generator functions can be tested in a number of ways
 *
 * @template T
 * @param {T[]} array
 * @yields T
 * @example generatorFunction(["foo", "bar", "baz"]).next()
 * // Call .next() immediately to check the first value
 * //=> {
 *   value: "foo",
 *   done: false
 * }
 * @example Array.from(generatorFunction([42, 17]))
 * // Consume the iterator into an array, and test that
 * //=> [42, 17]
 * @example
 * // Assign the iterator to a variable and iterate as many steps as needed
 * const it = generatorFunction(["baz", "qux"]);
 * it.next();
 * it.next();
 * it.next();
 * //=> {
     value: undefined,
 *   done: true
 * }
 */
export function* generatorFunction(array) {
  for (const x of array) yield x;
}
