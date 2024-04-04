import UpdateCustomerUseCase from "./update.customer.usecase";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import Address from "../../../domain/customer/value-object/address";

const input = {
    id: "441ad1c9-e1e0-49b8-a98f-cd76406cbc23",
    name: "John updated",
    address: {
        street: "street updated",
        city: "city updated",
        number: 1234,
        zip: "zip updated"
    }
}

const customer = CustomerFactory.createWithAddress("John", new Address("street", 123, "zip", "city"));
input.id = customer.id;

const MockRepository = () => {
    return {
        find: jest.fn().mockReturnValue(Promise.resolve(customer)),
        findAll: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
    };
}

describe("Unit Test update customer use case", () => {

    it("should update a customer", async () => {
        
        const customerRepository = MockRepository();
        const updateCustomerUseCase = new UpdateCustomerUseCase(customerRepository);
       
        const output = await updateCustomerUseCase.execute(input);

        expect(output).toEqual(input);

    });

});