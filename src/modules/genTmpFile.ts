import tmp from "tmp";
import { close } from "fs";

function genTmpFile(): string {
  tmp.setGracefulCleanup();
  const { name, fd }: tmp.FileResult = tmp.fileSync({ postfix: ".html" });
  close(fd);
  return name;
}

export { genTmpFile };
