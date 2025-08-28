export interface CreateTableOptions {
  base: number;
  limit?: number;
}

export interface CreateTableUseCase {
  execute: (options: CreateTableOptions) => string;
}

export class CreateTable implements CreateTableUseCase {
  constructor() { }

  execute({ base, limit = 10 }: CreateTableOptions) {
    const format: string[] = [];
    const multipliers: number[] = Array.from<number>(Array(limit).keys()).map(x => x + 1);

    const header = `
      =================================
            Tabla del ${base}           
      =================================
    `;

    format.push(header);

    multipliers.forEach((element) => {
      const f = `${base} X ${element} = ${base * element}`;

      format.push(f);
    });

    return format.join('\n');
  }
}