import {
  processConsoleArguments,
  readConfigurations,
  reportErrors,
} from "../cli";
import { groupErrors } from "./errors";
import { getProgramInput } from "./io";
import { parseInput } from "./parser";

/**
 * Main function.
 *
 * Everything related with the interface is implemented here.
 */
(async function main() {
  const argv = await processConsoleArguments();

  const normalizedData = await getProgramInput().then(parseInput);

  const configs = readConfigurations();

  const groupedErrors = groupErrors(normalizedData, configs.pathFilterRules);

  // only report the number of errors and the errors itself when the silent mode isn't enabled
  !argv.silent && reportErrors(groupedErrors);

  // when still existing errors after the clean action exit the program with an error. This is useful for CI pipelines
  // and to use bash/scripts.
  if (groupedErrors.validErrors.length !== 0) {
    process.exit(1);
  }
})();
