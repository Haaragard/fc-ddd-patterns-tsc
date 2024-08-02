export default class Product {

    private _id: string;
    private _name: string;
    private _price: number;

    constructor(id: string, name: string, price: number) {
        this._id = id;
        this._name = name;
        this._price = price;

        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    private validate() {
        if (this._id.length === 0) {
            throw new Error("Id is required.");
        }
        if (this._name.length === 0) {
            throw new Error("Name is required.");
        }
        if (this._price <= 0) {
            throw new Error("Price price is required to be greater than zero");
        }
    }

    public changeName(name: string): void {
        if (name.length === 0) {
            throw Error("New name can't be empty");
        }

        this._name = name;
    }

    public changePrice(amount: number): void {
        if (amount <= 0) {
            throw Error("New amount should be greater than zero");
        }

        this._price = amount;
    }
}