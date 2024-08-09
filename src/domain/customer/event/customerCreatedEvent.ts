import EventInterface from "../../shared/event/eventInterface";

export default class CustomerCreatedEvent implements EventInterface {
    eventName: string = "CustomerCreatedEvent";
    dataTimeOccurred: Date;
    eventData: any;

    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}