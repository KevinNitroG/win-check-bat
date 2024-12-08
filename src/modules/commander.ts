import { OptionValues, program } from "commander";

program
  .name("win-check-bat")
  .description("check battery health for Windows")
  .option("-t, --table", "print as table")
  .option("-p, --precise-health", "calculate precise health (not round)")
  .option("-o, --open-html", "open HTML exported file")
  .option(
    "-T, --open-html-timeout <number>",
    "open HTML timeout (s) before deleting temp file. Increase if your browser cannot open soon enough before open HTML file.",
    "1",
  );

program.parse(process.argv);

const options: OptionValues = program.opts();

export { options };
