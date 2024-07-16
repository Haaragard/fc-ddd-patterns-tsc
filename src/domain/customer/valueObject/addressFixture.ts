import Address from "./address";

export default class AddressFixture {
    public static create(parameters?: Object): Address {
        return new Address(
            parameters?.hasOwnProperty("street") ? parameters?.street : "Street Name",
            parameters?.hasOwnProperty("number") ? parameters?.number : 123,
            parameters?.hasOwnProperty("zip") ? parameters?.zip : "123-123-123",
            parameters?.hasOwnProperty("city") ? parameters?.city : "City Name"
        );
    }
}