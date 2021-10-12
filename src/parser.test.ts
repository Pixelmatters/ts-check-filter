import { matchErrorMsg, parseInput } from "./parser";

describe("parser", () => {
  describe("matchErrorMsg", () => {
    test("return null doesn't match the given string", () => {
      expect(matchErrorMsg("something")).toBeNull();
    });

    test("returns the matched parts of the error", () => {
      const matchResult = matchErrorMsg(
        "src/templates/solutions-secondary.tsx(72,24): error TS2352: Conversion of type"
      );

      if (matchResult === null) {
        throw new Error("must not be null");
      }

      expect(matchResult[1]).toEqual("src/templates/solutions-secondary.tsx");
      expect(matchResult[2]).toEqual("TS2352");
    });
  });

  describe("parseInput", () => {
    const error1 =
      "src/templates/solutions-secondary.tsx(72,24): error TS2352: Conversion of type";
    const error2 = "src/components/layout.tsx(43,11): error TS2339: Property";
    const error3 = "something";

    test("returns an empty array when given an empty array", () => {
      expect(parseInput([])).toEqual([]);
    });

    test("returns an empty array when no string match an error format", () => {
      expect(parseInput(["asd", "qwe"])).toEqual([]);
    });

    test("correctly parse error strings", () => {
      expect(parseInput([error1, error2])).toMatchObject([
        {
          filePath: "src/templates/solutions-secondary.tsx",
          errorCode: "TS2352",
          rawCodeLine: error1,
        },
        {
          filePath: "src/components/layout.tsx",
          errorCode: "TS2339",
          rawCodeLine: error2,
        },
      ]);
    });

    test("merge error when it has multiple lines", () => {
      const inputData = [error1, error2, error3];

      expect(parseInput(inputData)).toMatchObject([
        {
          filePath: "src/templates/solutions-secondary.tsx",
          errorCode: "TS2352",
          rawCodeLine: error1,
        },
        {
          filePath: "src/components/layout.tsx",
          errorCode: "TS2339",
          rawCodeLine: `${error2}\n${error3}`,
        },
      ]);
    });
  });
});
