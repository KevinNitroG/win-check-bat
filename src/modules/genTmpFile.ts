import { close } from 'fs';
import tmp from 'tmp';

function genTmpFile(): string {
  tmp.setGracefulCleanup();
  const { name, fd }: tmp.FileResult = tmp.fileSync({ postfix: '.html' });
  close(fd);
  return name;
}

export { genTmpFile };
