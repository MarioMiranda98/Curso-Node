import { CreateTable } from '../../../src/domain/usecases/create-table.usecase';

describe('Create table use case tests', () => {
  const offset = 5;

  test('Should create table with default value', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 2 });
    const rows = table.split('\n');

    expect(createTable).toBeInstanceOf(CreateTable);
    expect(table).toContain('2 X 1 = 2');
    expect(rows.length).toBe(10 + offset);
  });

  test('Should create table with custom values', () => {
    const createTable = new CreateTable();
    const table = createTable.execute({ base: 3, limit: 20 });

    const rows = table.split('\n');

    expect(table).toContain('3 X 1 = 3');
    expect(rows.length).toBe(20 + offset);
  });
})
