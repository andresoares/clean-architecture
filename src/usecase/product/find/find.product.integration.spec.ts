import { Sequelize } from "sequelize-typescript";
import FindCustomerUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import FindProductUseCase from "./find.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

const product = ProductFactory.createProduct("Product 1", 10);

describe("Test find product use case", () => {

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

    it("should find a product", async () => {
        
        const productRepository = new ProductRepository();
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
});