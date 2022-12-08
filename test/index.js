import { testy } from "../src/index.js";

// Let Testy test Testy
describe("Testy", () => {
  testy("src/index.js");
  testy("src/lib.js");
});
