#!/usr/bin/env node

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
  design: string;
  fullCharged: string;
} {
  const allRows: NodeListOf<HTMLTableRowElement> = document
    .querySelectorAll('body > table')
    .item(1)
    .querySelector('tbody')
    .querySelectorAll('tr');
  const design: string = allRows
    .item(4)
    .querySelectorAll('td')
    .item(1)
    .textContent.trim();
  const fullCharged: string = allRows
    .item(6)
    .querySelectorAll('td')
    .item(1)
    .textContent.trim();

  return { design, fullCharged };
}

function printBatteryInfo(document: Document): void {
  function extractCapacityNumber(capacity: string): number {
    const match: RegExpMatchArray = capacity.match(/^([\d,]+)/);
    if (match) {
      const numberOnly = match[1].replace(/,/g, '');
      return parseInt(numberOnly);
    }
    throw 'Cannot extract capacity number!';
  }
  const { design, fullCharged } = getCapacity(document);
  const designNum: number = extractCapacityNumber(design);
  const fullChargedNum: number = extractCapacityNumber(fullCharged);
  console.log(`Design capacity: ${design}`);
  console.log(`Full charged capacity: ${fullCharged}`);
  console.log(
    `Battery health: ${Math.round((fullChargedNum / designNum) * 100)}%`,
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
