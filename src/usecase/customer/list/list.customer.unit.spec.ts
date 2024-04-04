import Address from "../../../domain/customer/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress("John", new Address("street", 123, "zip", "city"))
const customer2 = CustomerFactory.createWithAddress("John", new Address("street", 123, "zip", "city"))



const MockRepository = () => {
    return {
        find: jest.fn(),
        findAll: jest.fn().mockReturnValue(Promise.resolve([customer1, customer2])),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test list customer use case", () => {

    it("should find all customer", async () => {
        
        const customerRepository = MockRepository();
        const listCustomerUseCase = new ListCustomerUseCase(customerRepository);
        const result = await listCustomerUseCase.execute({});
        const output = [customer1, customer2];
        
        expect(result.customers.length).toBe(2);
        expect(result.customers[0].name).toBe(customer1.name);
        expect(result.customers[1].name).toBe(customer2.name);

    });
});