import { CategoryModel } from "../../../data";
import { CreateCategoriesDto, CustomError, PaginationDto, UserEntity } from "../../../domain";

export class CategoryService {
  constructor() { }

  async createCategory(createCategoryDto: CreateCategoriesDto, user: UserEntity) {
    const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });

    if (categoryExists) throw CustomError.badRequest('Category already exists');

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id,
      });

      await category.save();

      return {
        id: category.id,
        name: category.name,
        available: category.available,
      };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  async getCategories(user: UserEntity, paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments({ user: user.id }),
        CategoryModel.find({ user: user.id }).skip((page - 1) * limit).limit(limit),
      ]);

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/categories?page=${page}&limit=${limit}`,
        previous: page > 1 ? `/api/categories?page=${page - 1}&limit=${limit}` : null,
        cateogories: categories.map(category => ({
          id: category.id,
          name: category.name,
          available: category.available,
        }))
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}