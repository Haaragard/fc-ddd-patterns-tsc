import CustomerCreatedEvent from "../../customer/event/customerCreatedEvent";
import EnviaConsoleLog1Handler from "../../customer/event/handler/enviaConsoleLog1Handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/enviaConsoleLog2Handler";
import SendEmailWhenproductIsCreatedHandler from "../../product/event/handler/sendEmailWhenProductIsCreatedHandler";
import ProductCreatedEvent from "../../product/event/productCreatedEvent";
import EventDispatcher from "./eventDispatcher";
import EventHandlerInterface from "./eventHandlerInterface";
import EventInterface from "./eventInterface";

describe("Domain events tests", () => {

    it("Should register an event handler", () => {
        let eventDispatcher = new EventDispatcher();
        let eventHandler = new SendEmailWhenproductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
        ).toBe(1);
        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
        ).toMatchObject(eventHandler);
    });

    it("Should unregister an event handler", () => {
        let eventDispatcher = new EventDispatcher();
        let eventHandler = new SendEmailWhenproductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeDefined();
        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"].length
        ).toBe(0);
    });

    it("Should unregister all event handlers", () => {
        let eventDispatcher = new EventDispatcher();
        let eventHandler = new SendEmailWhenproductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        eventDispatcher.unregisterAll();

        expect(
            eventDispatcher.getEventHandlers["ProductCreatedEvent"]
        ).toBeUndefined();
    });

    class EventNotificationDataProvider {
        event: EventInterface;
        handlers: EventHandlerInterface[];
    }

    let eventNotificationDataProvider: EventNotificationDataProvider[] = [
        {
            event: new ProductCreatedEvent({
                name: "Product 1",
                description: "Product 1 description",
                price: 10,
            }),
            handlers: [
                new SendEmailWhenproductIsCreatedHandler(),
            ],
        },
        {
            event: new CustomerCreatedEvent({
                name: "Customer 1",
            }),
            handlers: [
                new EnviaConsoleLog1Handler(),
                new EnviaConsoleLog2Handler(),
            ],
        },
    ];

    it.each(eventNotificationDataProvider)(`Should notify an event`, (dataProvider) => {
        let eventDispatcher = new EventDispatcher();
        let event = dataProvider.event;
        let eventHandlerSpies = dataProvider.handlers.map(
            (handler: EventHandlerInterface) => jest.spyOn(handler, "handle")
        );

        dataProvider.handlers.forEach((handler: EventHandlerInterface) => {
            eventDispatcher.register(event.eventName, handler);
        });

        eventDispatcher.notify(event);

        eventHandlerSpies.forEach((spy) => {
            expect(spy).toHaveBeenCalledWith(event);
        });
    });

});