import { OptionValues, program } from 'commander';

program
  .name('win-check-bat')
  .description('check battery health for Windows')
  .option('--no-status', "don't print out the status")
  .option('-d, --description', 'show silly description')
  .option('-l, --line', 'print line by line')
  .option('-p, --precise-health', 'calculate precise health (no round)')
  .option('-o, --open-html', 'open HTML exported file')
  .option(
    '-t, --open-html-timeout <second>',
    'open HTML timeout (s) before deleting temp file. Increase if your browser cannot open soon enough before open HTML file.',
    '1',
  );

program.parse(process.argv);

const options: OptionValues = program.opts();

export { options };
