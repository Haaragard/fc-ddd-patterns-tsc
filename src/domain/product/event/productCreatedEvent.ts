import EventInterface from "../../shared/event/eventInterface";

export default class ProductCreatedEvent implements EventInterface {
    eventName: string = "ProductCreatedEvent";
    dataTimeOccurred: Date;
    eventData: any;
    
    constructor(eventData: any) {
        this.dataTimeOccurred = new Date();
        this.eventData = eventData;
    }
}