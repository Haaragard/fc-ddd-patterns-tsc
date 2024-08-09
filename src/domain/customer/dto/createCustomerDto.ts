export default class CreateCustomerDTO {
    name: string;
    active: boolean = false;
    street: string;
    number: number;
    zip: string;
    city: string;

    constructor(
        name: string,
        active: boolean,
        street: string,
        number: number,
        zip: string,
        city: string
    ) {
        this.name = name;
        this.active = active;
        this.street = street;
        this.number = number;
        this.zip = zip;
        this.city = city;
    }
}