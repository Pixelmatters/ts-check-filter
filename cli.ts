import { red, green, blue, yellow, gray } from "nanocolors";
import { join } from "path";
// @ts-ignore
import Sywac from "sywac";
import { GroupedErrors } from "./src/errors";
import { REGEX_ERROR_PRINT } from "./src/parser";

interface Configs {
  pathFilterRules: Array<string | RegExp>;
}

const CONFIG_FILENAME = "ts-check-filter.js";

/**
 * Build and process the command line arguments.
 *
 * @returns
 */
export const processConsoleArguments = () =>
  Sywac.boolean("silent", {
    desc: "Don't print anything to the console.",
  })
    .help("-h, --help")
    .version("-v, --version")
    .parseAndExit();

/**
 * Format the error messages.
 *
 * While receiving the messages the formatting is destroyed, so this functions reconstructs it.
 *
 * @param error
 * @returns
 */
const formatError = (error: string): string => {
  // FIXME: this is a simple trick to prevent line breaks from being removed. Remove this when we found a better
  // solution.
  const safeError = error.replace("\n", "[LB]");
  const parts = safeError.match(REGEX_ERROR_PRINT);

  if (!parts) {
    return error;
  }

  return `${blue(parts[1])}${yellow(parts[2])}${gray(": error")} ${red(
    parts[3]
  )}${parts[4]}`.replace("[LB]", "\n");
};

/**
 * Print out the found errors and some statistics.
 *
 * @param group
 */
export const reportErrors = (group: GroupedErrors) => {
  const totalErrors = group.ignoredErrors.length + group.validErrors.length;

  // report number of errors found
  console.log(`${red(totalErrors)} errors found`);
  console.log(`${green(group.ignoredErrors.length)} errors ignored`);

  // report errors
  group.validErrors.forEach((entry) =>
    console.log(`\n${formatError(entry.rawCodeLine)}`)
  );
};

export const readConfigurations = (): Configs =>
  require(join(process.cwd(), CONFIG_FILENAME));
