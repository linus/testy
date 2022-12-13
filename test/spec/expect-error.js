/**
 * @template {string | undefined} T
 * @param {T} x
 * @returns {undefined}
 * @throws {Error<T>}
 * @example throws(4711)
 * //=> throw new Error(4711)
 */
export function throws(x) {
  throw new Error(x);
}
