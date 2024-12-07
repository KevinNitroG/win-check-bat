import { close as fsClose, readFileSync } from 'fs';
import { JSDOM } from 'jsdom';
import util from 'node:util';
import tmp from 'tmp';
// @ts-ignore
import which from 'which'; // no d.ts

const exec: Function = util.promisify(require('node:child_process').exec);

async function checkExternalCommandExist(executable: string): Promise<boolean> {
  const path: string | null = await which(executable, { nothrow: true });
  return path !== null;
}

function genTmpFile(): string {
  tmp.setGracefulCleanup();
  const { name, fd }: tmp.FileResult = tmp.fileSync();
  fsClose(fd);
  return name;
}

async function execBatteryReport(output: string): Promise<void> {
  await exec(`powercfg.exe /BATTERYREPORT /OUTPUT ${output}`);
}

function getCapacity(document: Document): {
  design: string;
  fullCharged: string;
} {
  const allRows: NodeListOf<HTMLTableRowElement> | undefined = document
    ?.querySelectorAll('body > table')
    ?.item(1)
    ?.querySelector('tbody')
    ?.querySelectorAll('tr');
  const design: string | undefined = allRows
    ?.item(4)
    ?.querySelectorAll('td')
    ?.item(1)
    ?.textContent?.trim();
  const fullCharged: string | undefined = allRows
    ?.item(6)
    ?.querySelectorAll('td')
    ?.item(1)
    ?.textContent?.trim();

  if (!allRows || !design || !fullCharged) {
    throw 'Cannot get data from table in DOM';
  }
  return { design, fullCharged };
}

function printBatteryInfo(document: Document): void {
  function extractCapacityNumber(capacity: string): number {
    const match: RegExpMatchArray | null = capacity.match(/^([\d,]+)/);
    if (match) {
      const numberOnly = match[1].replace(/,/g, '');
      return parseInt(numberOnly);
    }
    throw 'Cannot extract capacity number!';
  }
  const { design, fullCharged } = getCapacity(document);
  const designNum: number = extractCapacityNumber(design);
  const fullChargedNum: number = extractCapacityNumber(fullCharged);
  const health: number = Math.round((fullChargedNum / designNum) * 100);
  console.log(`Design capacity: ${design}`);
  console.log(`Full charged capacity: ${fullCharged}`);
  console.log(`Battery health: ${health}%`);
}

async function init(): Promise<void> {
  if (!(await checkExternalCommandExist('powercfg.exe'))) {
    console.error('"powercfg.exe" is not found on your machine!');
    return;
  }
  const tempFile: string = genTmpFile();
  await execBatteryReport(tempFile);
  const HTMLContent: string = readFileSync(tempFile, 'utf8');
  const document: Document = new JSDOM(HTMLContent).window.document;
  try {
    printBatteryInfo(document);
  } catch (e) {
    console.error('Cannot get battery health information:', e);
  }
}

init();
