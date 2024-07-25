import AddressFixture from "../valueObject/addressFixture";
import Customer from "./customer";
import {v4 as uuid} from "uuid";

export default class CustomerFixture {
    public static create(parameters?: Object): Customer {
        let address = parameters?.hasOwnProperty("address")
            ? parameters.address
            : AddressFixture.create();

        return new Customer(
            parameters?.hasOwnProperty("id") ? parameters.id : uuid(),
            parameters?.hasOwnProperty("name") ? parameters.name : "Customer name",
            parameters?.hasOwnProperty("active") ? parameters.active : false,
            address
        );
    }
}