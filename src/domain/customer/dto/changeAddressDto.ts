export default class ChangeAddressDto {
    street: string;
    number: number;
    zip: string;
    city: string;

    constructor(
        street: string,
        number: number,
        zip: string,
        city: string
    ) {
        this.street = street;
        this.number = number;
        this.zip = zip;
        this.city = city;
    }
}