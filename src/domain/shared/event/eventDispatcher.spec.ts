import SendEmailWhenproductIsCreatedHandler from "../../product/event/handler/sendEmailWhenProductIsCreatedHandler";
import ProductCreatedEvent from "../../product/event/productCreatedEvent";
import EventDispatcher from "./eventDispatcher";

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

    it("Should notify an event", () => {
        let eventDispatcher = new EventDispatcher();
        let productCreatedEvent = new ProductCreatedEvent({
            name: "Product 1",
            description: "Product 1 description",
            price: 10,
        });
        let eventHandler = new SendEmailWhenproductIsCreatedHandler();
        let spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalledWith(productCreatedEvent);
    });

});