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
export function* generateValues(values) {
  for (const x of values) yield x;
}

/**
 * Here's old Fibonacci
 *
 * @param {number[]} start
 * @yields {number}
 * @example fibonacci().next().value
 * //=> 0
 * @example
 * const f = fibonacci();
 * f.next();
 * f.next().value
 * //=> 1
 * @example
 * const f = fibonacci();
 * f.next();
 * f.next();
 * f.next().value
 * //=> 1
 * @example
 * const f = fibonacci();
 * [...Array(13)].map(() => f.next().value)
 * //=> [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
 * @example
 * const f = fibonacci([8, 13]);
 * [...Array(13)].map(() => f.next().value)
 * //=> [8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584]
 */
export function* fibonacci([last, next] = [0, 1]) {
  yield last;
  while (true) {
    yield next;
    [last, next] = [next, next + last];
  }
}
