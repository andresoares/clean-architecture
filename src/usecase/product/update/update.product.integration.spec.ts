import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";


const input = {
    id: "1",
    name: "Product 2",
    price: 20
}

const product = ProductFactory.createProduct("Product 1", 10);
input.id = product.id;

describe("Test update product use case", () => {

    let sequelize: Sequelize;
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true }
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update a product", async () => {
        
        const productRepository = new ProductRepository();
        productRepository.create(product);

        const useCase = new UpdateProductUseCase(productRepository);
        const output = await useCase.execute(input);
        
        expect(output).toEqual(input);
        
    });
});