import { testy } from "../src/index.js";

// Let Testy test Testy - Quis probiet ipsos probates?
describe("Testy", () => {
  describe.skip("Skip entry point", () => testy("src/index.js"));
  testy("src/lib.js");
});

describe("Specification", () => {
  describe("Functions returning a Promise can be tested like a regular function", () => {
    testy("test/spec/returns-promise.js");
  });
  describe("Functions throwing an Error can be tested by expecting a thrown Error", () => {
    testy("test/spec/expect-error.js");
  });
  describe("Generator functions can be tested in different ways ", () => {
    testy("test/spec/generator-function.js");
  });
  describe("Examples without a result are not tested", () => {
    testy("test/spec/example-without-result.js");
  });
  describe("Sample passing module (@supabase/doctest-js)", () => {
    testy("test/spec/sample-passing-module.js");
  });
  describe("Sample passing class (@supabase/doctest-js)", () => {
    testy("test/spec/sample-passing-class.js");
  });
});
