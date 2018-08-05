const solution = require("./index");
const mockData = require("./mocks/mock");

describe("Tests for task", () => {
  describe("test solution on mock data", () => {
    test("test", () => {
      const result = solution(mockData.input);

      expect(result.consumedEnergy.value).toBe(mockData.output.consumedEnergy.value);
    });
  });

  describe("test utilites", () => {});
});
