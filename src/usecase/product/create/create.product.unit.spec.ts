import CreateProductUseCase from "./create.product.usecase";
import CreateCustomerUseCase from "./create.product.usecase";

const input = {
    name: "Product 1",
    price: 10
}

const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}



describe("Unit Test create product use case", () => {

    it("should create a product", async () => {
        
        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);
       
        const output = await useCase.execute(input);

        expect(output).toEqual({
            id: expect.any(String),
            name: input.name,
            price: input.price
        });

    });

    it("should thrown an error when name is requered", async () => {

        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);
       
        input.name = "";
        await expect(useCase.execute(input)).rejects.toThrow("Name is required")

    });

    it("should thrown an error when price greater than zero", async () => {

        const productRepository = MockRepository();
        const useCase = new CreateProductUseCase(productRepository);
       
        input.name = "Product 1";
        input.price = -1;
        await expect(useCase.execute(input)).rejects.toThrow("Price must be greater than zero")

    });

});