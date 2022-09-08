/* eslint-disable no-undef */
import { sum } from "./sum.js";

describe("Example", () => {
    it("adds 1 + 2 to equal 3", () => {
        expect(sum(1, 2)).toBe(3);
    });
    it("adds 1 + 2 to > 2", () => {
        expect(sum(1, 2)).toBeGreaterThan(2);
    });
    it("adds 1 + 2 to < 4", () => {
        expect(sum(1, 2)).toBeLessThan(4);
    });
    it.todo("Ceci est un todo");
});
