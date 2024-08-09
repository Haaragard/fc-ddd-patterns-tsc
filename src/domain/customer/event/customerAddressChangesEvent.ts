import EventInterface from "../../shared/event/eventInterface";

export default class CustomerAddressChangedEvent implements EventInterface {
    eventName: string = "CustomerAddressChangedEvent";
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}