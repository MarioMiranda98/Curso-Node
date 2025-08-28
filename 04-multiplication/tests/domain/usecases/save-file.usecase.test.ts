import { SaveFile } from '../../../src/domain/usecases/save-file.usecase';
import fs from 'fs';

describe('Save file usecase', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    if (fs.existsSync('outputs')) {
      fs.rmSync('outputs', { recursive: true });
    }
  });

  test('Should save file with default values', () => {
    const saveFile = new SaveFile();

    const options = {
      fileContent: 'Test content',
    }

    const result = saveFile.execute(options);

    expect(result).toBeTruthy();

    const fileExists = fs.existsSync('outputs/table.txt');
    const fileContent = fs.readFileSync('outputs/table.txt', { encoding: 'utf-8' });
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('Should create file with custom values', () => {
    const options = {
      fileContent: 'Custom content',
      destination: 'custom-outputs',
      fileName: 'custom-table-name'
    }

    const saveFile = new SaveFile();

    const result = saveFile.execute(options);

    expect(result).toBeTruthy();

    const path = `${options.destination}/${options.fileName}.txt`;

    const fileExists = fs.existsSync(path);
    const fileContent = fs.readFileSync(path, { encoding: 'utf-8' });
    expect(fileExists).toBeTruthy();
    expect(fileContent).toBe(options.fileContent);
  });

  test('Should return false if directory could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
      () => { throw new Error('error') }
    );

    const result = saveFile.execute({ fileContent: 'aqui' });

    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  });

  test('Should return false if file could not be created', () => {
    const saveFile = new SaveFile();
    const mkdirSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
      () => { throw new Error('error') }
    );

    const result = saveFile.execute({ fileContent: 'aqui' });

    expect(result).toBe(false);
    mkdirSpy.mockRestore();
  })
});