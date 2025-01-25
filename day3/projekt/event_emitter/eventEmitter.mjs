
export class EventEmitter {
    #eventNameToCbs = new Map;

    constructor() {
        this.addEventListener = this.on.bind(this);
        this.removeEventListener = this.off.bind(this);
    }

    on(eventName, cb) {
        if(this.#eventNameToCbs.has(eventName)) {
            const cbArr = this.#eventNameToCbs.get(eventName);
            cbArr.push(cb);
        } else {
            this.#eventNameToCbs.set(eventName, [cb]);
        }
    }

    off(eventName, cb) {
        if(this.#eventNameToCbs.has(eventName)) {
            const cbInternalArr = this.#eventNameToCbs.get(eventName);
            // cbInternalArr = cbInternalArr.filter(cbInternal => cbInternal !== cb);
            // this.#eventNameToCbs.set(eventName, cbInternalArr);

            const cbIndex = cbInternalArr.findIndex(cbInternal => cbInternal === cb);
            if (cbIndex !== -1) {
                cbInternalArr.splice(cbIndex, 1);
            }
        }
    }

    dispatch(eventName, eventData) {
        if (this.#eventNameToCbs.has(eventName)) {
            const cbArr = this.#eventNameToCbs.get(eventName);
            cbArr.forEach(cb => cb(eventData));
        }
    }
}

// const em = new EventEmitter;
// const handleUpdateEvent1 = eventData => {
//     console.log("handleUpdateEvent1", eventData);
// }
// const handleUpdateEvent2 = eventData => {
//     console.log("handleUpdateEvent2", eventData);
// }

// em.on("update", handleUpdateEvent1); // update -> [handleUpdateEvent1]
// em.addEventListener("update", handleUpdateEvent2); // update -> [handleUpdateEvent1, handleUpdateEvent2]
// em.dispatch("update", {
//     refresh: true,
// });
// //...
// em.off("update", handleUpdateEvent1);
// em.removeEventListener("update", handleUpdateEvent2);
// em.dispatch("update");
// //...