export class CreateTodoDto {
  private constructor(public readonly text: string) { }

  static create(props: {
    [key: string]: unknown;
  }): [string | undefined, CreateTodoDto?] {
    const { text } = props;

    if (!text || (text as string).length === 0) return ['Text property is not valid'];

    return [undefined, new CreateTodoDto(text as string)];
  }
}
