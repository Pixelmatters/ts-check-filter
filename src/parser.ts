import { arrayReplacePos } from "./utils";

/**
 * Regex to parse a TypeScript error line.
 *
 * This can parse errors like the following one:
 *
 * ```ts
 * src/stories/content-block.stories.tsx(24,3): error TS2741
 * ```
 */
const REGEX_ERROR_LINE = /^(.*)\(\d+,\d+\): error (TS\d{4,}):.*$/;

export const REGEX_ERROR_PRINT = /^(.*)(\(\d+,\d+\)): error (TS\d{4,})(.*)$/m;

/**
 * Interface to temporary hold the parsed line.
 */
export interface TSError {
  filePath: string;
  errorCode: string;
  rawCodeLine: string;
}

/**
 * Check if the line is an TS error.
 *
 * @param line
 * @returns
 */
export const matchErrorMsg = (line: string) => line.match(REGEX_ERROR_LINE);

const constructParseEntry = (matchParts: RegExpMatchArray) =>
  ({
    filePath: matchParts[1],
    errorCode: matchParts[2],
    rawCodeLine: matchParts.input as string,
  } as TSError);

/**
 * Parse the input data.
 *
 * @param data
 * @returns
 */
export function parseInput(data: Array<string>): Array<TSError> {
  return data.reduce<Array<TSError>>((errors: Array<TSError>, line: string) => {
    const errorParts = matchErrorMsg(line);

    const newEntry = !!errorParts ? constructParseEntry(errorParts) : null;

    if (newEntry) {
      return [...errors, newEntry];
    }

    // if the error array is empty return an empty array
    if (errors.length === 0) {
      return [];
    }

    const newErrorStr = `${errors[errors.length - 1].rawCodeLine}\n${line}`;
    const updatedEntry: TSError = {
      ...errors[errors.length - 1],
      rawCodeLine: newErrorStr,
    };

    return arrayReplacePos(errors, errors.length - 1, updatedEntry);
  }, []);
}
