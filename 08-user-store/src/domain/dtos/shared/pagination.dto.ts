export class PaginationDto {
  private constructor(
    public readonly page: number,
    public readonly limit: number,
  ) { }

  public static create(page: number = 1, limit: number = 10): [string?, PaginationDto?] {
    if (isNaN(page) || page < 1) return ['Page must be a number and greater than 0'];
    if (isNaN(limit) || limit < 1) return ['Limit must be a number and greater than 0'];

    return [, new PaginationDto(page, limit)];
  }
}