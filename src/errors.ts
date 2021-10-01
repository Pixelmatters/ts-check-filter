import { TSError } from "./parser";

/**
 * Type to organize the errors based on the given execution rules.
 */
export interface GroupedErrors {
  ignoredErrors: Array<TSError>;
  validErrors: Array<TSError>;
}

/**
 * Check if the given error is to be ignored.
 *
 * @param entry
 * @param blockedList
 * @returns
 */
const isIgnored = (
  entry: TSError,
  blockedList: Array<string | RegExp>
): boolean =>
  blockedList.some((toTest) =>
    typeof toTest === "string"
      ? toTest === entry.filePath
      : toTest.test(entry.filePath)
  );

/**
 * Group errors based per ignored and not ignored ones.
 *
 * @param errors
 * @param blockedList
 * @returns
 */
export const groupErrors = (
  errors: Array<TSError>,
  blockedList: Array<string | RegExp>
): GroupedErrors => {
  const initialObj: GroupedErrors = { ignoredErrors: [], validErrors: [] };

  return errors.reduce<GroupedErrors>((result, entry) => {
    if (isIgnored(entry, blockedList)) {
      return { ...result, ignoredErrors: [...result.ignoredErrors, entry] };
    }

    return { ...result, validErrors: [...result.validErrors, entry] };
  }, initialObj);
};
