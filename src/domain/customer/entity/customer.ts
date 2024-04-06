import NotificationError from "../../@shared/notification/notification.error";
import Entity from "../../entity/entity.abstract";
import Address from "../value-object/address";

export default class Customer extends Entity {
    
    private _name: string = "";
    private _address!: Address;
    private _active: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if(this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors());
        }
    }

    validate() {
        if(this._name.length === 0) {
            this.notification.addError({
                context: 'customer',
                message: 'Name is required'
            });
        }

        if(this._id.length === 0) {
            this.notification.addError({
                context: 'customer',
                message: 'Id is required'
            });
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    activate() {
        if(this._address === undefined) {
            this.notification.addError({
                context: 'customer',
                message: 'Address is mandatory to activate a customer'
            });
            throw new NotificationError(this.notification.getErrors());
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    get address(): Address {
        return this._address;
    }

    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    isActive(): boolean {
        return this._active;
    }
}