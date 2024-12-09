import { readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import open from 'open';
import sleep from 'sleep-promise';

import { options } from '@modules/commander.ts';
import { execBatteryReport } from '@modules/execBatteryReport.ts';
import { genTmpFile } from '@modules/genTmpFile.ts';
import { ProcessInfo } from '@modules/processInfo.ts';

async function init(): Promise<void> {
  const tempFile: string = genTmpFile();
  try {
    await execBatteryReport(tempFile);
  } catch (e) {
    console.error(`Cannot run powercfg: ${e}`);
    return;
  }
  const HTMLContent: string = readFileSync(tempFile, 'utf8');
  const document: Document = new JSDOM(HTMLContent).window.document;
  try {
    const processInfo: ProcessInfo = new ProcessInfo(document);
    processInfo.printInfo();
  } catch (e) {
    console.error(`Fail to process info: ${e}`);
  }
  if (options.openHtml) {
    await open(tempFile);
    await sleep(options.openHtmlTimeout * 1000);
  }
}

init();
