export class CreateCategoriesDto {
  private constructor(
    public readonly name: string,
    public readonly available: boolean,
  ) { }

  static create(object: { [key: string]: any }): [string?, CreateCategoriesDto?] {
    const { name, available = false } = object;
    let availableBoolean = available;

    if (!name) return ['Missing name'];
    if (typeof available !== 'boolean') {
      availableBoolean = (available === 'true')
    }

    return [, new CreateCategoriesDto(name as string, availableBoolean as boolean)];
  }
}