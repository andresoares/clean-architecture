import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import Address from "../../../domain/customer/value-object/address";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) { }

    async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {

        const product = ProductFactory.createProduct(input.name, input.price)

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            price: product.price
        }
    }
}