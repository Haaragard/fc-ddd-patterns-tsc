import Address from "./address";
import AddressFixture from "./addressFixture";

describe("Address unit tests.", () => {

    it("Should throw an error when street is empty", () => {
        expect(() => {
            let address = AddressFixture.create({
                street: "",
            });
        }).toThrow("Street is required.");
    });

    it("Should throw an error when number is below or equals zero", () => {
        expect(() => {
            let address = AddressFixture.create({
                number: 0,
            });
        }).toThrow("Number is expected to be positive.");
    });

    it("Should throw an error when zip is empty", () => {
        expect(() => {
            let address = AddressFixture.create({
                zip: "",
            });
        }).toThrow("Zip is required.");
    });

    it("Should throw an error when city is empty", () => {
        expect(() => {
            let address = AddressFixture.create({
                city: "",
            });
        }).toThrow("City is required.");
    });

    it("Should create an new Address", () => {
        let address = AddressFixture.create();

        expect(address).toBeInstanceOf(Address);
    });

    it("Should throw an Error when ", () => {
        let street = "Street Name";
        let number = 123;
        let zip = "123123-123123";
        let city = "City Name";

        let address = new Address(
            "Street Name",
            123,
            "123123-123123",
            "City Name"
        );

        expect(address.toString()).toBe(`${street}, ${number}, ${zip}, ${city}`);
    });
});