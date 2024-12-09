import type { Info } from 'types/info.ts';
import { options } from '@modules/commander.ts';

class ProcessInfo {
  #info: Info;

  constructor(document: Document) {
    this.#info = ProcessInfo.#getCapacity(document);
  }

  static #extractCapacityNumber(capacity: string): number {
    const match: RegExpMatchArray | null = capacity.match(/^([\d,]+)/);
    if (match) {
      const numberOnly = match[1].replace(/,/g, '');
      return parseInt(numberOnly);
    }
    throw new Error('Cannot extract capacity number!');
  }

  static #getCapacity(document: Document): Info {
    const allRows: NodeListOf<HTMLTableRowElement> | undefined = document
      .querySelectorAll('body > table')
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
      throw new Error('Cannot get data from table in DOM');
    }

    const designNum: number = ProcessInfo.#extractCapacityNumber(design);
    const fullChargedNum: number =
      ProcessInfo.#extractCapacityNumber(fullCharged);
    let healthNum: number = (fullChargedNum / designNum) * 100;
    if (options.preciseHealth) {
      healthNum = Math.round(healthNum);
    }
    return { design, fullCharged, health: `${healthNum}%` };
  }

  #printInfoLineByLine(): void {
    console.log(`Design capacity: ${this.#info.design}`);
    console.log(`Full charged capacity: ${this.#info.fullCharged}`);
    console.log(`Battery health: ${this.#info.health}`);
  }

  #printInfoTable(): void {
    console.table(this.#info);
  }

  printInfo(): void {
    if (options.table) {
      this.#printInfoTable();
    } else {
      this.#printInfoLineByLine();
    }
  }
}

export { ProcessInfo };
