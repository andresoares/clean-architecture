import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductFactory from "../../../domain/product/factory/product.factory";
import ListProductUseCase from "./list.product.usecase";

const product1 = ProductFactory.createProduct("Product 1", 10);
const product2 = ProductFactory.createProduct("Product 2", 20);

describe("Test find all products use case", () => {

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

    it("should find all product", async () => {

        const productRepository = new ProductRepository();
        const useCase = new ListProductUseCase(productRepository);
        await productRepository.create(product1);
        await productRepository.create(product2);


        const result = await useCase.execute({});

        expect(result.products.length).toBe(2);
        expect(result.products[0].name).toBe(product1.name);
        expect(result.products[0].id).toBe(product1.id);
        expect(result.products[0].price).toBe(product1.price);
        expect(result.products[1].name).toBe(product2.name);
        expect(result.products[1].id).toBe(product2.id);
        expect(result.products[1].price).toBe(product2.price);

    });
});