import { CreateTable } from "../domain/usecases/create-table.usecase";
import { SaveFile } from "../domain/usecases/save-file.usecase";

interface RunOptions {
  base: number;
  limit: number;
  showTable: boolean;
  name: string;
  destination: string;
}

export class ServerApp {
  static async run({ base, limit, showTable, name, destination }: RunOptions) {
    console.log('Server Running...')

    const table = new CreateTable().execute({ base, limit });
    const fileWasCreated = new SaveFile().execute({ fileContent: table, fileName: name, destination: destination });

    if (showTable) console.log(table);

    fileWasCreated ? console.log('File created') : console.log('File not created');
  }
}