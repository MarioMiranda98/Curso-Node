import { ProductModel } from "../../../data";
import { CreateProductDto, CustomError } from "../../../domain";
import { PaginationDto } from '../../../domain/dtos/shared/pagination.dto';

export class ProductService {
  constructor() { }

  async createProduct(createProductDto: CreateProductDto) {
    const doesExist = await ProductModel.findOne({ name: createProductDto.name });
    if (doesExist) throw CustomError.badRequest('Product already exists');

    try {
      const product = new ProductModel({
        ...createProductDto
      });

      await product.save();

      return {
        ...product
      };
    } catch (e) {
      throw CustomError.internalServer(`${e}`);
    }

  }

  async getProducts(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;

    try {
      const [total, products] = await Promise.all([
        ProductModel.countDocuments(),
        ProductModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
          .populate('user')
          .populate('category')
      ]);

      return {
        page: page,
        limit: limit,
        total: total,
        next: `/api/products?page=${page}&limit=${limit}`,
        previous: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
        products: products,
      }
    } catch (e) {
      throw CustomError.internalServer(`${e}`);
    }
  }
}