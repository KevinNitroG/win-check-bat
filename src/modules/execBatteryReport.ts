import util from "node:util";
import child_process from "node:child_process";

const exec = util.promisify(child_process.exec);

async function execBatteryReport(output: string): Promise<void> {
  try {
    await exec(`powercfg.exe /BATTERYREPORT /OUTPUT ${output}`);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (_) {
    await exec(`powercfg /BATTERYREPORT /OUTPUT ${output}`);
  }
}

export { execBatteryReport };
