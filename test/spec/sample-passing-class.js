// This is an example of a string helper module

class Arithmetic {
  /**
   * @param {number} foo A number
   */
  constructor(foo) {
    this.foo = foo;
  }

  /**
   * @param {number} a A number
   * @param {number} b Another number
   * @returns {number} The sum of a + b
   * @example new Arithmetic().add(1, 2)
   * //=> 3
   * @example
   * const arithmetic = new Arithmetic();
   * arithmetic.add(1, 9)
   * //=> 10
   */
  add(a, b) {
    return a + b;
  }

  /**
   * @param {number} a A number
   * @param {number} b Another number
   * @returns {number} The difference of a - b
   * @example new Arithmetic().subtract(10, 2)
   * //=> 8
   */
  subtract(a, b) {
    return a - b;
  }

  /**
   * @param {number} a A number
   * @returns {number} The sum of this.foo and a
   * @example new Arithmetic(7).addToThis(3)
   * //=> 10
   */
  addToThis(a) {
    return this.foo + a;
  }

  /**
   * @param {number} a A number
   * @example
   * const arithmetic = new Arithmetic(17);
   * arithmetic.increaseThis(42);
   * arithmetic.foo
   * //=> 59
   */
  increaseThis(a) {
    this.foo += a;
  }
}

export { Arithmetic };
