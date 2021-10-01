import { createInterface } from "readline";

export function getProgramInput() {
  return new Promise<Array<string>>((resolve) => {
    const programInput: Array<string> = [];
    const progInterface = createInterface(process.stdin);

    progInterface.on("line", (line) => programInput.push(line));
    progInterface.once("close", () => resolve(programInput));
  });
}
