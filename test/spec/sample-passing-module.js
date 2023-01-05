// This is an example of a string helper module

/**
 * Returns a word with all letter downcases except the first letter
 * @param {string} word - The word to be titleized
 * @return {string} The string titlelized
 * @example
 * titleize('wOaH')
 * //=> 'Woah'
 * @example
 * titleize('w')
 * //=> 'W'
 */
export function titleize(word) {
  switch (word.length) {
    case 0:
      return "";
    case 1:
      return word.toUpperCase();
    default:
      return word[0].toUpperCase() + word.slice(1, word.length).toLowerCase();
  }
}

/**
 * Returns fairly unnecessary and uninteresting information about a string
 * @param {string} string - The string of disinterest
 * @return {object} Useless information
 * @example
 * stringData(
 *   'woah'
 * )
 * //=> {
 *   length: 4,
 *   vowels: 2,
 *   consonants: 2
 * }
 */
export function stringData(string) {
  const vowels = string
    .toLowerCase()
    .split("")
    .filter((char) =>
      ["a", "e", "i", "o", "u", "y"].find((v) => char === v)
    ).length;
  return {
    vowels,
    length: string.length,
    consonants: string.length - vowels,
  };
}

/**
 * Does the same thing as String.prototype.split
 * @param {string} string - The string you should be using .split on
 * @param {string} delimiter - The arg you would pass to .split
 * @return {string[]} The exact same thing .splt would return
 * @example
 * split('why am i doing this?', ' ')
 * //=> [ 'why', 'am', 'i', 'doing', 'this?' ]
 */
export function split(string, delimiter) {
  return string.split(delimiter);
}

/**
 * @param {number} a
 * @param {number} b
 * @example add(1, 2)
 * //=> 3
 * @example add(3, 4)
 * //=> 7
 * @example add(3, 4)
 * //=> 7
 */
export function add(a, b) {
  return a + b;
}

/**
 * Github Issue: https://github.com/supabase/doctest-js/issues/1
 * @param {Object<string, string>} obj
 * @private
 * @returns {string}
 *
 * @example objectToQueryString({
 *  param1: 'hello',
 *  param2: 'world'
 * })
 * //=> 'param1=hello&param2=world'
 */
export function objectToQueryString(obj) {
  return Object.keys(obj)
    .map((param) => `${param}=${obj[param]}`)
    .join("&");
}

/**
 * @typedef {{name: string, type: string}} Column
 * Github Issue: https://github.com/supabase/doctest-js/issues/1
 * Converts the value of an individual column
 * @param {string} columnName The column that you want to convert
 * @param {Column[]} columns All of the columns
 * @param {string[]} records The map of string values
 * @param {string[]} skipTypes An array of types that should not be converted
 * @returns {string | number}
 *
 * @example convertColumn(
 *  'age',
 *  [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}],
 *  ['Paul', '33'],
 *  []
 * )
 * //=> 33
 * @example convertColumn(
 *  'age',
 *  [{name: 'first_name', type: 'text'}, {name: 'age', type: 'int4'}],
 *  ['Paul', '33'],
 *  ['int4']
 * )
 * //=> '33'
 */
export const convertColumn = (columnName, columns, records, skipTypes) => {
  let column = columns.find((x) => x.name == columnName);
  let columnNum = columns.findIndex((x) => x.name == columnName);
  // @ts-ignore
  if (skipTypes.includes(column.type)) return noop(records[columnNum]);
  // @ts-ignore
  else return convertCell(column.type, records[columnNum]);

  function noop(/** @type {string} */ val) {
    return val;
  }

  /**
   * @param {string} _type
   * @param {string} val
   * @returns {number}
   */
  function convertCell(_type, val) {
    return parseInt(val);
  }
};
