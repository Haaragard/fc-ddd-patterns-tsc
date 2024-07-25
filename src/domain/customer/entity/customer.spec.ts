import Address from "../valueObject/address";
import AddressFixture from "../valueObject/addressFixture";
import Customer from "./customer";
import CustomerFixture from "./customerFixture";

describe("Customer unit tests.", () => {

    it("Should throw error when id is empty", () => {
        expect(() => {
            CustomerFixture.create({
                id: "",
            });
        }).toThrow("Id is required.");
    });

    it("Should throw error when name is empty", () => {
        expect(() => {
            CustomerFixture.create({
                name: "",
            });
        }).toThrow("Name is required.");
    });

    it("Should throw error when address is empty", () => {
        expect(() => {
            new Customer(
                "123",
                "Customer Name",
                false
            );
        }).toThrow("Address is required.");
    });

    it("Should throw error when adding reward points is equals of below zero", () => {
        expect(() => {
            let customer = CustomerFixture.create();
            customer.addRewardPoints(-1)
        }).toThrow("Given points should be greater than zero.");
    });

    it("Should create a customer successfully", () => {
        let customer = CustomerFixture.create();

        expect(customer).toBeInstanceOf(Customer);
    });

    it("Should retrieve the id from a customer", () => {
        let customer = CustomerFixture.create({
            id: "123",
        });

        expect(customer.id).toBe("123");
    });
    
    it("Should retrieve the name from a customer", () => {
        let customer = CustomerFixture.create({
            name: "Customer Name",
        });

        expect(customer.name).toBe("Customer Name");
    });

    it("Should retrieve the active status from a customer", () => {
        let customer = CustomerFixture.create({
            active: true,
        });

        expect(customer.isActive).toBe(true);
    });

    it("Should retrieve address from a customer", () => {
        let address = AddressFixture.create({
            street: "Street Name",
        });

        let customer = CustomerFixture.create({
            address: address,
        });

        expect(customer.address).toBeInstanceOf(Address);
        expect(customer.address?.street).toBe("Street Name");
    });

    it("Should add reward points for a customer", () => {
        let customer = CustomerFixture.create();
        
        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(100);

        customer.addRewardPoints(100);
        expect(customer.rewardPoints).toBe(200);

        customer.addRewardPoints(300);
        expect(customer.rewardPoints).toBe(500);
    });

});