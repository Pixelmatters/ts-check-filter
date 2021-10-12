import { arrayReplacePos } from "./utils";

describe("arrayReplacePos", () => {
  test("return the same array when pos is bigger than the higher index", () => {
    const testArray = [1, 2, 3, 4, 5];
    expect(arrayReplacePos(testArray, 10, 1)).toEqual(testArray);
  });

  test("change element on the given position", () => {
    const testArray = [1, 2, 3, 4, 5];
    const resultArray = [1, 10, 3, 4, 5];

    expect(arrayReplacePos(testArray, 1, 10)).toEqual(resultArray);
  });
});
