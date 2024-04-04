import UpdateCustomerUseCase from "./update.product.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";
import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const input = {
    id: "1",
    name: "Product 2",
    price: 20
}

const product = ProductFactory.createProduct( "Product 1", 10);
input.id = product.id;

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(product)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test update product use case", () => {

    it("should update a product", async () => {
        
        const productRepository = MockRepository();
        const updateProductUseCase = new UpdateProductUseCase(productRepository);
       
        const output = await updateProductUseCase.execute(input);

        expect(output).toEqual(input);

    });

});