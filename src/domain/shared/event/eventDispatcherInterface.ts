import EventHandlerInterface from "./eventHandlerInterface";
import EventInterface from "./eventInterface";

export default interface EventDispatcherInterface {
    register(eventName: string, eventHandler: EventHandlerInterface): void;

    unregister(eventName: string, eventHandler: EventHandlerInterface): void;

    unregisterAll(): void;

    notify(event: EventInterface): void;
}