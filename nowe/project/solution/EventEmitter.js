
class EventEmitter {
    #eventToCbs = new Map;
    constructor() {
        this.addEventListener = this.on.bind(this);
        this.removeEventListener = this.off.bind(this);
    }
    on(event, cb) {
        if (event) {
            if (this.#eventToCbs.has(event)) {
                const cbs = this.#eventToCbs.get(event);
                cbs.push(cb);
            } else {
                this.#eventToCbs.set(event, [cb]);
            }
        }
    }
    once(event, cb) {
        if (event) {
            const cbWrappr = (...args) => {
                cb(...args);
                this.off(event, cbWrappr);
            }
            if (this.#eventToCbs.has(event)) {
                const cbs = this.#eventToCbs.get(event);
                cbs.push(cbWrappr);
            } else {
                this.#eventToCbs.set(event, [cbW]);
            }
        }
    }
    off(event, cbToBeRemoved) {
        const cbs = this.#eventToCbs.get(event);
        if (cbs !== undefined) {
            for(let i = 0; i < cbs.length; i++) {
                if (cbs[i] === cbToBeRemoved) {
                    if (cbs.length === 1) {
                        this.#eventToCbs.delete(event);
                    } else {
                        cbs.splice(i, 1);
                    }
                    break;
                }
            }
        }
    }
    dispatch(eventName, eventData) {
        const cbs = this.#eventToCbs.get(eventName);
        if (cbs !== undefined) {
            cbs.forEach(cb => cb(eventData));
        }
    }
}

const em = new EventEmitter;
const handleUpdateEvent1 = (...eventData) => {
    console.log("handleUpdateEvent1", eventData.join(","));
}
const handleUpdateEvent2 = (...eventData) => {
    console.log("handleUpdateEvent2", eventData.join(","));
}
em.on("update", handleUpdateEvent1);
em.addEventListener("update", handleUpdateEvent2);
em.dispatch("update", [Date.now(), 1]);
//...
em.off("update", handleUpdateEvent1);
em.removeEventListener("update", handleUpdateEvent2);
em.dispatch("update", [Date.now()]);
//...

