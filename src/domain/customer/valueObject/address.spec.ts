import Address from "./address";
import AddressFixture from "./addressFixture";

describe("Address unit tests.", () => {

    it("Should throw an error when street is empty", () => {
        expect(() => {
            AddressFixture.create({
                street: "",
            });
        }).toThrow("Street is required.");
    });

    it("Should throw an error when number is below or equals zero", () => {
        expect(() => {
            AddressFixture.create({
                number: 0,
            });
        }).toThrow("Number is expected to be positive.");
    });

    it("Should throw an error when zip is empty", () => {
        expect(() => {
            AddressFixture.create({
                zip: "",
            });
        }).toThrow("Zip is required.");
    });

    it("Should throw an error when city is empty", () => {
        expect(() => {
            AddressFixture.create({
                city: "",
            });
        }).toThrow("City is required.");
    });

    it("Should create an new Address", () => {
        let address = AddressFixture.create();

        expect(address).toBeInstanceOf(Address);
    });

    it("Should return address as string", () => {
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

    it("Should retrieve a street from an address", () => {
        let address = AddressFixture.create({
            street: "Street Name",
        });

        expect(address.street).toBe("Street Name");
    });

    it("Should retrieve a number from an address", () => {
        let address = AddressFixture.create({
            number: 123,
        });

        expect(address.number).toBe(123);
    });

    it("Should retrieve a zip from an address", () => {
        let address = AddressFixture.create({
            zip: "123-123-123",
        });

        expect(address.zip).toBe("123-123-123");
    });

    it("Should retrieve a city from an address", () => {
        let address = AddressFixture.create({
            city: "City Name",
        });

        expect(address.city).toBe("City Name");
    });
});