import Address from "./address";

describe("Address unit tests.", () => {

    it("Should throw an error when street is empty", () => {
        expect(() => {
            let address = new Address(
                "",
                123,
                "123123-123123",
                "City Name"
            );
        }).toThrow("Street is required.");
    });

    it("Should throw an error when number is below or equals zero", () => {
        expect(() => {
            let address = new Address(
                "Street Name",
                0,
                "123123-123123",
                "City Name"
            );
        }).toThrow("Number is expected to be positive.");
    });

    it("Should throw an error when zip is empty", () => {
        expect(() => {
            let address = new Address(
                "Street Name",
                123,
                "",
                "City Name"
            );
        }).toThrow("Zip is required.");
    });

    it("Should throw an error when city is empty", () => {
        expect(() => {
            let address = new Address(
                "Street Name",
                123,
                "123123-123123",
                ""
            );
        }).toThrow("City is required.");
    });

    it("Should create an new Address", () => {
        let address = new Address(
            "Street Name",
            123,
            "123123-123123",
            "City Name"
        );

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