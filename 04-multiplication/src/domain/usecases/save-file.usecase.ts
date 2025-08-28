import fs from 'fs';

export interface SaveFileOptions {
  fileContent: string;
  destination?: string;
  fileName?: string;
}

export interface SafeFileUsecase {
  execute: (options: SaveFileOptions) => boolean;
}

export class SaveFile implements SafeFileUsecase {
  constructor() { }

  execute({ fileContent, destination = 'outputs', fileName = 'table' }: SaveFileOptions) {
    try {
      fs.mkdirSync(destination, { recursive: true });
      fs.writeFileSync(`${destination}/${fileName}.txt`, fileContent);

      return true;
    } catch (e) {
      console.error(e);

      return false;
    }
  }
}