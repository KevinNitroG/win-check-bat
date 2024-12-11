import type { Info } from '@ctypes/info.js';
import type { Status } from '@ctypes/status.js';
import { options } from '@modules/commander.js';
import { getStatus, getStatusDesc } from '@utils/status.js';
import { getStatusColor } from '@utils/statusColor.js';
import { Table } from 'console-table-printer';

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
    let health: number = (fullChargedNum / designNum) * 100;
    if (options.preciseHealth as boolean | string) {
      health = Math.round(health);
    }
    const status: Status = getStatus(health);
    return { design, fullCharged, health, status };
  }

  #printInfoLineByLine(): void {
    console.log(`Design capacity: ${this.#info.design}`);
    console.log(`Full charged capacity: ${this.#info.fullCharged}`);
    console.log(`Battery health: ${this.#info.health}%`);
    if (options.status as boolean | string) {
      console.log(`Status: ${this.#info.status}`);
    }
    if (options.description as boolean | string) {
      console.log(`Description: ${getStatusDesc(this.#info.status)}`);
    }
  }

  #printInfoTable(): void {
    const table = new Table({
      columns: [
        { name: 'design', title: 'Design Capacity', alignment: 'center' },
        {
          name: 'fullCharged',
          title: 'Full Charged Capacity',
          alignment: 'center',
        },
        { name: 'health', title: 'Health', alignment: 'center' },
        {
          name: 'status',
          title: 'Status',
          alignment: 'center',
          color: getStatusColor(this.#info.status),
        },
      ],
      disabledColumns: [(!options.status as boolean | string) ? 'status' : ''],
    });
    table.addRow({
      design: this.#info.design,
      fullCharged: this.#info.fullCharged,
      health: `${this.#info.health}%`,
      status: this.#info.status,
    });
    table.printTable();
    console.log();
    if (options.description as boolean | string) {
      console.log(getStatusDesc(this.#info.status));
    }
  }

  printInfo(): void {
    if (options.line as boolean | string) {
      this.#printInfoLineByLine();
    } else {
      this.#printInfoTable();
    }
  }
}

export { ProcessInfo };
