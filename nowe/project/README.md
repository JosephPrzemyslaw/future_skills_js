# Zadanie [event_emitter]
## Opis

#### 1) Zapoznaj się z działaniem klasy `EventEmitter` (node) oraz `EventTarget`.

- https://nodejs.org/api/events.html
- https://developer.mozilla.org/en-US/docs/Web/Events

#### 2) Zaimplementuj własną klasę `EventEmitter` z ograniczonym interfejsem:
```javascript
on(eventName:string, cb: (...args: any[]) => any);
addEventListener(eventName:string, cb: (...args: any[]) => any);
off(eventName:string, cb: (...args: any[]) => any);
removeEventListener(eventName:string, cb: (...args: any[]) => any);
// on && addEventListener to aliasy
// off && removeEventListener to aliasy
```

#### Przewidywane użycie:
```javascript
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
```

#### Podpowiedzi
- strutura mapująca nazwę zdarzenia na zbiór powiązanych funkcji:
    ```javascript
    class EventEmitter {
        #eventToCbs = new Map;
        //...
    }
    ```
- tworzenie aliasu posiadając implementację `on`
    ```javascript
    constructor() {
        this.addEventListener = this.on.bind(this);
        //...
    }
    ```
#### Dodatkowe
Metoda `once` sprawia, że `callback` wołany jest **tylko raz**, tj. po pierwszym wystąpieniu zdarzenia. Przedstaw potencjalną implementację.
```javascript
once(eventName:string, (...args: any[]) => any)
```

<br>

# Zadanie [model]
## Opis

#### Zaimplementuj model `EmployeeModel` o następujących cechach:
- korzysta z interfejsu klasy `EventEmitter`
- przechouwje dane na temat pracowników
- dane pobierane są z serwisu `https://hub.dummyapis.com/employee?noofRecords=[recordNo]&idStarts=[employeeStartId]`
- model w tym celu wystawia metodę `update`
    ```typescript
    type RequestEmployeeType = {
        recordNo: number,
        recordIdStart: number,
    }
    EmployeeModel:update(requestEmployeeParams: RequestEmployeeType);
    ```
- emituje zdarzenie `update` w przypadku poprawnego zaciągnięcia danych lub `error` gdy nie udało się pobrać pracowników

#### Przewidywane użycie:
```javascript
const em = new EmployeeModel;
em.on("update", employees => {
    employees.forEach(employee => {
        console.log(employee.id, employee.firstName, employee.lastName, employee.email);
    });
});
em.on("error", console.error);

em.update({recordNo: 20, recordIdStart: 30});
// widoczne dane na temat użytkowników w konsoli w przypadku pozytywnym
// lub komunikat o błędzie w przypadku nie pobrania danych
```

<br>

# Zadanie [views]
## Opis
Przygotuj aplikację wyświetlającą szczegóły na temat pracowników (jeden widok) oraz liczbę pracowników (drugi widok)
- oba widoki trzymają referencję do modelu
    ```javascript
    class EmployeeListView {
        #model;
        constructor(model) {
            this.#model = model
        }
        //...
    }

    export default new EmployeeListView
    ```
- model dostarczany jest jako parametr konstruktorów:
    ```javascript
    const em = new EmployeeModel;
    const employeeListView = new EmployeeListView(em);
    const employeeLengthView = new EmployeeLengthView(em);
    ```
- widoki odświeżane są automatycznie po tym jak model ulega zmianie
    ```javascript
    const em = new EmployeeModel;
    const employeeListView = new EmployeeListView(em);
    const employeeLengthView = new EmployeeLengthView(em);
    //...
    em.update(); // triggers view rerendering
    ```
- widoki same tworzą swoją reprezentację w `HTML`
    ```javascript
        class EmployeeListView {
            //...
            #employees= [];
            //...
            #createEl() {
                const root = document.createElement("ul");
                root.classList.add("employee-list");

                this.#el = root;
            }
            render() {
                this.#el.replaceChildren([]);
                this.#employees.forEach(employee => {
                    // przygoruj <li> element
                    this.#el.appendChild(li);
                });
            }
        }
    ```

- podpinane są do kontenera na zasadzie:
    ```javascript
    document.body.append(employeeListView.getEl());
    document.body.append(employeeLengthView.getEl());
    ```