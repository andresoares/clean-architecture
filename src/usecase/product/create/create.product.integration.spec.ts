import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import CreateProductUseCase from "./create.product.usecase";

const product = ProductFactory.create("a", "Product 1", 10);

describe("Test create product use case", () => {

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

    it("should create a product", async () => {
        
        const productRepository = new ProductRepository();
        const useCase = new CreateProductUseCase(productRepository);
        const result = await useCase.execute(product);
        
        expect(result).toEqual({
            id: expect.any(String),
            name: product.name,
            price: product.price
        });

        
    });
});