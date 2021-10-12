import { GroupedErrors, groupErrors } from "./errors";
import { TSError } from "./parser";

describe("errors", () => {
  const error1: TSError = {
    errorCode: "TS2352",
    filePath: "src/templates/solutions-secondary.tsx",
    rawCodeLine:
      "src/templates/solutions-secondary.tsx(72,24): error TS2352: Conversion of type",
  };
  const error2: TSError = {
    rawCodeLine: "src/components/layout.tsx(43,11): error TS2339: Property",
    errorCode: "TS2339",
    filePath: "src/components/layout.tsx",
  };

  describe("groupErrors", () => {
    test("when no errors are given returns an object with the properties empty", () => {
      expect(groupErrors([], [])).toEqual<GroupedErrors>({
        ignoredErrors: [],
        validErrors: [],
      });
    });

    test("when given errors with no block list mark all as valid", () => {
      expect(groupErrors([error1, error2], [])).toEqual<GroupedErrors>({
        ignoredErrors: [],
        validErrors: [error1, error2],
      });
    });

    test("when given errors present on the block list mark it as ignored", () => {
      expect(
        groupErrors([error1, error2], ["src/components/layout.tsx"])
      ).toEqual<GroupedErrors>({
        ignoredErrors: [error2],
        validErrors: [error1],
      });
    });

    test("when using a regex match against the filePath", () => {
      expect(groupErrors([error1, error2], [/src\/.*/])).toEqual<GroupedErrors>(
        {
          ignoredErrors: [error1, error2],
          validErrors: [],
        }
      );
    });
  });
});
