import { Sequelize } from "sequelize-typescript";
import FindProductUseCase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.createProduct('Product 1', 10);

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test find product use case", () => {

    it("should find a product", async () => {
        
        const productRepository = MockRepository();
        const useCase = new FindProductUseCase(productRepository);
        await productRepository.create(product);
        
        const input = {
            id: product.id
        }

        const output = {
            id: product.id,
            name: "Product 1",
            price: 10
        }

        const result = await useCase.execute(input);
        expect(result).toEqual(output);

    });

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
        })
        const useCase = new FindProductUseCase(productRepository);
        await productRepository.create(product);

        const input = {
            id: product.id
        }

        expect(() => {
            return useCase.execute(input);
        }).rejects.toThrow("Product not found");


    })
});