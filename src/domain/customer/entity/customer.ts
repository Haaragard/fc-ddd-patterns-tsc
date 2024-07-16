import Address from "../valueObject/address";

export default class Customer {
    
    _id: string;
    _name: string;
    _address: Address;
    _active: boolean;

    constructor(
        id: string,
        name: string,
        address: Address,
        active: boolean
    ) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._active = active;

        this.validate();
    }

    validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required.");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required.");
        }
        if (this._address === undefined) {
            throw new Error("Address is required.");
        }
    }

    get id(): string {
        return this._id;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
        this.validate();
    }

    activate() {
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}