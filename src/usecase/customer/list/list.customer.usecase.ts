import CustomerRepositoryInterface from "../../../domain/customer/repository/customer.repository.interface";
import { InputFindCustomerDto, OutputFindCustomerDto } from "./list.customer.dto";

export default class ListCustomerUseCase {
    constructor(private customerRepository: CustomerRepositoryInterface) { }

    async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
        const customers = await this.customerRepository.findAll();

        const output = {
            customers: customers.map(customer => {
                return {
                    id: customer.id,
                    name: customer.name,
                    address: {
                        street: customer.address.street,
                        city: customer.address.city,
                        number: customer.address.number,
                        zip: customer.address.zip,
                    }
                }
            })
        }
        
        return output;
        
    }
}