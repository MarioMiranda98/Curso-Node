export class UpdateTodoDto {
  private constructor(
    public readonly id: number,
    private readonly text?: string,
    private readonly completedAt?: Date
  ) { }

  get values() {
    const returnObj: {
      [key: string]: any;
    } = {};

    if (this.text) returnObj.text = this.text;
    if (this.completedAt) returnObj.completedAt = this.completedAt;

    return returnObj;
  }

  static create(props: {
    [key: string]: unknown;
  }): [string | undefined, UpdateTodoDto?] {
    const { text, completedAt, id } = props;

    if (!id || isNaN(Number(id))) return ['Id must be a valid number'];

    let newCompletedAt: any = completedAt;

    if (completedAt) {
      newCompletedAt = new Date(completedAt as string);

      if (newCompletedAt.toString() === 'Invalid Date') {
        return ['CompletedAt must be a valid date'];
      }
    }

    return [
      undefined,
      new UpdateTodoDto(id as number, text as string, newCompletedAt as Date),
    ];
  }
}
