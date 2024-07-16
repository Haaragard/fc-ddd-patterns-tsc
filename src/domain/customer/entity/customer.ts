import Address from "../valueObject/address";

export default class Customer {
    
    private _id: string;
    private _name: string;
    private _address?: Address;
    private _active: boolean;

    constructor(
        id: string,
        name: string,
        active: boolean,
        address?: Address,
    ) {
        this._id = id;
        this._name = name;
        this._active = active;
        this._address = address;

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

    get name(): string {
        return this._name;
    }

    get isActive(): boolean {
        return this._active;
    }

    get address(): Address|undefined {
        return this._address;
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