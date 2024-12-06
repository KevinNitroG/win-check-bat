import { readFileSync, close as fsClose } from 'fs';
import { JSDOM } from 'jsdom';
import util from 'node:util';
import tmp from 'tmp';

const exec: Function = util.promisify(require('node:child_process').exec);

function genTmpFile(): string {
  tmp.setGracefulCleanup();
  const { name, fd }: tmp.FileResult = tmp.fileSync();
  fsClose(fd);
  return name;
}

async function execBatteryReport(output: string): Promise<void> {
  await exec(`powercfg /BATTERYREPORT /OUTPUT ${output}`);
}

function getCapacity(document: Document): {
  designCapacityString: string;
  designCapacity: number;
  fullChargedCapacityString: string;
  fullChargedCapacity: number;
} {
  function extractCapacityNumber(capacity: string): number {
    const match: RegExpMatchArray = capacity.match(/^([\d,]+)/);

    if (match) {
      const numberOnly = match[1].replace(/,/g, '');
      return parseInt(numberOnly);
    }
  }
  const allRows: NodeListOf<HTMLTableRowElement> = document
    .querySelectorAll('body > table')
    .item(1)
    .querySelector('tbody')
    .querySelectorAll('tr');
  const designCapacityString: string = allRows
    .item(4)
    .querySelectorAll('td')
    .item(1)
    .textContent.trim();
  const fullChargedCapacityString: string = allRows
    .item(6)
    .querySelectorAll('td')
    .item(1)
    .textContent.trim();
  const designCapacity: number = extractCapacityNumber(designCapacityString);
  const fullChargedCapacity: number = extractCapacityNumber(
    fullChargedCapacityString,
  );

  return {
    designCapacityString,
    designCapacity,
    fullChargedCapacityString,
    fullChargedCapacity,
  };
}

function printBatteryInfo(document: Document): void {
  const {
    designCapacityString,
    designCapacity,
    fullChargedCapacityString,
    fullChargedCapacity,
  } = getCapacity(document);
  console.log(`Design capacity: ${designCapacityString}`);
  console.log(`Full charged capacity: ${fullChargedCapacityString}`);
  console.log(
    `Battery health: ${Math.round((fullChargedCapacity / designCapacity) * 100)}%`,
  );
}

async function init(): Promise<void> {
  const tempFile: string = genTmpFile();
  await execBatteryReport(tempFile);
  const HTMLContent: string = readFileSync(tempFile, 'utf8');
  const document: Document = new JSDOM(HTMLContent).window.document;
  printBatteryInfo(document);
}

init();
