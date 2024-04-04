import ProductRepositoryInterface from "../../../domain/product/repository/product.repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    constructor(private productRepository: ProductRepositoryInterface) { }

    async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
        const products = await this.productRepository.findAll();

        const output = {
            products: products.map(product => {
                return {
                    id: product.id,
                    name: product.name,
                    price: product.price
                }
            })
        }
        
        return output;
        
    }
}