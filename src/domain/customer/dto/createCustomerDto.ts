export default class CreateCustomerDTO {
    id: string;
    name: string;
    active: boolean = false;
    street: string;
    number: number;
    zip: string;
    city: string;

    constructor(
        id: string,
        name: string,
        active: boolean,
        street: string,
        number: number,
        zip: string,
        city: string
    ) {
        this.id = id;
        this.name = name;
        this.active = active
        this.street = street;
        this.number = number;
        this.zip = zip;
        this.city = city;
    }
}