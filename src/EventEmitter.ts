
type Listener<T extends Array<any>> = (...args: T) => void;

export default class EventEmitter<EventMap extends Record<string, Array<any>>> {
    private events: {
        [K in keyof EventMap]?: Set<Listener<EventMap[K]>>;
    } = {};

    on<K extends keyof EventMap>(event: K, listener: Listener<EventMap[K]>) {
        const listeners = this.events[event] ?? new Set();
        listeners.add(listener);
        this.events[event] = listeners;
    }

    emit<K extends keyof EventMap>(event: K, ...args: EventMap[K]) {
        const listeners = this.events[event] ?? new Set();
        for (const listener of listeners) {
            listener(...args);
        }
    }
}
