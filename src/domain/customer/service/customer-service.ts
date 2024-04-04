import Customer from "../entity/customer";
import Address from "../value-object/address";
import { v4 as uuid } from "uuid";
import CustomerCreatedEvent from "../event/customer-created.event";
import { Service } from "./service";
import CustomerAddressChangedEvent from "../event/customer-address-changed.event";

export default class CustomerService extends Service{

    public static initialize() {
        this.setup();
    }

    static create(name: string, address: Address): void {
        this.initialize();
        let customer = new Customer(uuid(), name);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: customer.id,
            name: customer.name,
        });
        this._eventDispatcher.notify(customerCreatedEvent);

        if(address) {
            customer.changeAddress(address);
            const customerAddressChangedEvent = new CustomerAddressChangedEvent({
                id: customer.id,
                name: customer.name,
                address: customer.address.toString()
            });
            this._eventDispatcher.notify(customerAddressChangedEvent);
        }
        
    }

}