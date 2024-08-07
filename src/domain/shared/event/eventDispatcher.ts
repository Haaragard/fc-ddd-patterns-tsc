import EventDispatcherInterface from "./eventDispatcherInterface";
import EventHandlerInterface from "./eventHandlerInterface";
import EventInterface from "./eventInterface";

export default class EventDispatcher implements EventDispatcherInterface {
    private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

    get getEventHandlers(): { [eventName: string]: EventHandlerInterface[] } {
        return this.eventHandlers;
    }

    register(eventName: string, eventHandler: EventHandlerInterface): void {
        this.defineEventHandlers(eventName);

        this.eventHandlers[eventName].push(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface): void {
        this.defineEventHandlers(eventName);

        let index = this.eventHandlers[eventName].indexOf(eventHandler);
        if (index >= 0) {
            this.eventHandlers[eventName].splice(index, 1);
        }
    }

    unregisterAll(): void {
        this.eventHandlers = {};
    }

    notify(event: EventInterface): void {
        let eventName = event.eventName;
        this.defineEventHandlers(eventName);

        this.eventHandlers[eventName].forEach((eventHandler: EventHandlerInterface) => {
            eventHandler.handle(event);
        });
    }

    private defineEventHandlers(eventName: string): void {
        if (! this.eventHandlers[eventName]) {
            this.eventHandlers[eventName] = [];
        }
    }
}