import { red, green } from "nanocolors";

import { groupErrors } from "./errors";
import { getProgramInput } from "./io";
import { parseInput } from "./parser";

(async function () {
  const normalizedData = await getProgramInput().then(parseInput);

  const ignoredFiles = [/src\/__generated__\/.*/];
  const groupedErrors = groupErrors(normalizedData, ignoredFiles);

  // report number of errors found
  console.log(`${red(normalizedData.length)} errors found`);
  console.log(`${green(groupedErrors.ignoredErrors.length)} errors ignored`);

  // report errors
  groupedErrors.validErrors.forEach((entry) =>
    console.log(`\n${entry.rawCodeLine}`)
  );

  // when still existing errors after the clean action exit the program with an error. This is useful for CI pipelines
  // and to use bash/scripts.
  if (groupedErrors.validErrors.length !== 0) {
    process.exit(1);
  }
})();
