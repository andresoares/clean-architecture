import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer.repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {

        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        });

    }

    async update(entity: Customer): Promise<void> {

        await CustomerModel.update({
            name: entity.name,
            street: entity.address.street,
            number: entity.address.number,
            zip: entity.address.zip,
            city: entity.address.city,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        },
            {
                where: {
                    id: entity.id
                }
            });
    }

    async find(id: string): Promise<Customer> {

        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({ where: { id: id } });
        } catch (error) {
            throw Error("Customer not found");
        }

        return this.convertCustomerModelToCustomer(customerModel);
    }

    async findAll(): Promise<Customer[]> {
        const customersAll = await CustomerModel.findAll();
        return customersAll.map(i => this.convertCustomerModelToCustomer(i) );
    }

    private convertCustomerModelToCustomer(customerModel: CustomerModel): Customer {
        const customer = new Customer(
            customerModel.id,
            customerModel.name
        );
        const address = new Address(customerModel.street, customerModel.number, customerModel.zip, customerModel.city);
        customer.changeAddress(address);
        customer.addRewardPoints(customerModel.rewardPoints);
        if (customerModel.active) {
            customer.activate();
        }
        return customer;
    }

}