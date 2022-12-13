# 🧪 Testy

Testy is no fuss [doctests][doctest] for Node.js. Document your code with
[JSDoc][jsdoc], provide your [@example][example], and run your tests with
[Mocha][mocha].

![CI status](https://github.com/linus/testy/workflows/ci/badge.svg)

## Installation

```bash
$ npm install @linus/testy
```

## Usage

1. In your code, document your functions with JSDoc tags, providing `@example`
tags for your examples:

```js
/**
 * A cool function
 * 
 * @param {string} name
 * @returns {string} A greeting
 * @example hello("Mr von Neumann")
 * //=> "Hello, Mr von Neumann!"
 */
 export function hello(name) {
  return `Hello, ${name}!`;
 }
```

**Notes**: The function under test **must** be exported, and it **cannot** be a
default export. Only named exports work. The expected result **must** be
prefixed with the string `//=>` on the beginning of a new line, after the
example code.

2. To execute the test, add a file which is discovered by Mocha (e.g. in a
`tests/` directory), and call `testy` with the path to the file to be tested:

```js
import { testy } from "@linus/testy";

/**
 * A test
 */
describe("Tests", () => testy("hello.js"));
```

3. Run `mocha` and relax. Your code *and* your examples are tested!

```bash
$ npm test

  Tests
    hello.js
      hello
        ✔ hello("Mr von Neumann")
//=> "Hello, Mr von Neumann!"


  1 passing (6ms)
```

## Advanced

Testy can handle Promises (in both examples and expected results), expected
Errors (both thrown Errors and rejected Promises), generator functions, and
more. Examples are in [test/spec](test/spec). This also acts as the
specification and test suite for Testy.

## Development

Testy is under active development. Pull requests are welcome:

1. Fork the repository
2. Clone the project to your own machine
3. Commit changes to a new branch of your fork
4. Push your work (making sure the code is tested!)
5. Submit a pull request

## Authors

Linus Thiel <linus@yesbabyyes.se>.

## Thank you

- [kiwicopple](https://github.com/kiwicopple) for providing
  `@supabase/doctest-js`, giving rise to adequate frustration to think of a new
  solution.
- [75lb](https://github.com/75lb) for the `jsdoc-api` module, which does all of
  the heavy lifting.
- [ry](https://github.com/ry) as always, for Node.js, Deno and more.

## License

ISC License

Copyright 2022 Linus Thiel.

Permission to use, copy, modify, and/or distribute this software for any purpose
with or without fee is hereby granted, provided that the above copyright notice
and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS
OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER
TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF
THIS SOFTWARE.


[doctest]: https://docs.python.org/3/library/doctest.html
[jsdoc]: https://jsdoc.app/
[example]: https://jsdoc.app/tags-example.html
[mocha]: https://mochajs.org/
