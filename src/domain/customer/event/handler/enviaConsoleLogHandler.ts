import EventHandlerInterface from "../../../shared/event/eventHandlerInterface";
import CustomerAddressChangedEvent from "../customerAddressChangesEvent";

export default class EnviaConsoleLogHandler
    implements EventHandlerInterface<CustomerAddressChangedEvent> {
    handle(event: CustomerAddressChangedEvent): void {
        let data: any = event.eventData;
        let endereco: string = `${data.address.street} ${data.address.number}, ${data.address.zip} ${data.address.city}`;

        console.log(`Endereço do cliente: ${data.id}, ${data.name} alterado para: ${endereco}.`);
    }
} 