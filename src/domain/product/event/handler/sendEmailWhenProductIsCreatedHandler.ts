import EventHandlerInterface from "../../../shared/event/eventHandlerInterface";
import ProductCreatedEvent from "../productCreatedEvent";

export default class SendEmailWhenproductIsCreatedHandler
    implements EventHandlerInterface<ProductCreatedEvent> {
    handle(event: ProductCreatedEvent): void {
        console.log(`Sending email to ...`);
    }
} 