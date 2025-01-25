# Zadanie 1 [model]
## Opis

Zaimplementuj klasę `CurrentTimeWeatherModel`, która będzie przechowywała dane (wszystkie typu `string`) związane z pogodą, tj:
- miasto
- temperatura
- ikonę
- prędkość wiatru

Model posiada funkcję `update`, która zaciąga dane z serwisu `open weather map`. Odpytuje end-point postaci:
```
https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}
```
Klucz API odczytywany przez model jest umiesczony w configu. Pobrane dane są przechowywane wewnętrznie w modelu. Funkcja `update` posiada opcjonalny parametr `cancel`, która anuluje poprzedni request. Zaimplementuj metodę `toJSON`, która zwróci
wewnętrzną reprezentację modelu:
```ts

{
    data: WeatherData,
    error: boolean,
}
```
np.:
```js
{
    data: {
        city: "Poznan"
        temp: "30",
        icon: "o4",
        windSpeed: "15",
    },
    error: null,
};
```
gdzie `WeatherData` to:
```ts
type WeatherData = {
    city: string,
    temp: string,
    icon: string,
    windSpeed: string,
}
```

## Podpowiedzi

Szkielet
```js
export default class CurrentTimeWeatherModel {
    #urlFormat = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid=08fa1b19f2541e554b840b180814ad08`;
    #abortController;
    #weatherDetails;

    async update(city, cancel = false) {
        //...
    }

    toJSON() {
        return {...this.#weatherDetails};
    }
}
```

## Użycie
```js
const currTimeWeatherModel = new CurrentTimeWeatherModel;
await currTimeWeatherModel.update("Poznan");
//..
currTimeWeatherMap.update("Warsaw");
//...
currTimeWeatherMap.update("Gdansk", true); // cancels Warsaw's request if it is pending
```

<br>

# Zadanie 2 [event_emitter]
## Opis

Zaimplementuj osobno obsługę zdarzeń

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

### Podpowiedzi
Struktura mapująca nazwę zdarzenia na zbiór powiązanych funkcji:
```javascript
class EventEmitter {
    #eventToCbs = new Map;
    //...
}
```
Tworzenie aliasu posiadając implementację `on`
```javascript
constructor() {
    this.addEventListener = this.on.bind(this);
    //...
}
```
Szkielet
```js

export class EventEmitter {
    #eventToCbs = new Map;

    constructor() {
        //...
    }

    on(eventName, cb) {
        //...
    }

    off(eventName, cb) {
        //...
    }

    dispatch(eventName, ...args) {
        //...
    }
}
```

#### Dodatkowe
Metoda `once` sprawia, że `callback` wołany jest **tylko raz**, tj. po pierwszym wystąpieniu zdarzenia. Przedstaw potencjalną implementację.
```javascript
once(eventName:string, (...args: any[]) => any)
```

<br>

# Zadanie 3 [model_event]
## Opis

Dodaj obsługę zdarzeń do klasy `CurrentTimeWeatherModel`. Klasa emituje zdarzenie `load` po załadowaniu danych.
W przypadku błędu generowane jest zdarzenie `error`.

## Użycie
```js
const weatherModel = new CurrentTimeWeatherModel;
weatherModel.on("load", weatherDetails => {
    console.log(weatherDetails.data.city, weatherDetails.data.temp);
    //...
});

weatherModel.on("error", weatherDetails => {
    console.log(weatherDetails.error);
    //...
});
await weatherModel.update("Poznan");
```

<br>

# Zadanie 4 [dummy_view]
## Opis

Stwórz prosty widok, który rysuje dane dostarczone przez model. Model jest przesyłany jako parametr konstruktora. Widok posiada metodę `getEl` zwracającą fragmetn drzewa, który reprezentuje.

## Podpowiedzi:

Template:
```
<div class='dummy-view'>
    <div class='dummy-view-error'></div>
    <div class='dummy-view-data'>
        <div class='dummy-view-city'>{{city}}</div>
        <div class='dummy-view-icon'><img src='https://openweathermap.org/img/wn/{{iconSrc}}@4x.png' /></div>
        <div class='dummy-view-windSpeed'>{{windSpeed}}</div>
    </div>
</div>
```

Nasłuch modelu:
```js
this.#model.on("load", newModelData => {
    this.#error = null;
    this.render(newModelData);
});
this.#model.on("error", error => {
    this.#error = error.message;
    this.render(null);
});
```

Stworzenie widoku:
```js
const wm = new CurrentTimeWeatherModel;
const wv = new WeatherDummyView(wm);
```

Podpięcie do DOM:
```js
document.body.appendChild(weatherView.getEl());
```

Przykładowy szkielet:
```js
export default class WeatherDummyView {
    //...
    #template = `<div class='dummy-view'>
        <div class='dummy-view-error'></div>
        <div class='dummy-view-data'>
            <div class='dummy-view-city'>{{city}}</div>
            <div class='dummy-view-icon'><img src='https://openweathermap.org/img/wn/{{iconSrc}}@4x.png' /></div>
            <div class='dummy-view-windSpeed'>{{windSpeed}}</div>
        </div>
    </div>`;

    constructor(model) {
        this.#model = model;
        //...
    }

    render(modelData) {
        //...
    }

    getEl() {
        return this.#el;
    }

    #createEl() {
        //...
    }

    #parseTemplate(newModelData = {}) {
        //...
    }
}
```

## Użycie
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dummy View Example</title>
</head>
<body>
    <div id="mounting-point"></div>
    <script type="module">
        import WeatherDummyView from "./weatherDummyView.mjs";
        import CurrentTimeWeatherModel from "../currentTimeWeatherModel.mjs";

        const wm = new CurrentTimeWeatherModel;
        const wv = new WeatherDummyView(wm);
        document.body.appendChild(wv.getEl());
        wm.update("Poznan");
    </script>
</body>
</html>
```

<br>

# Zadanie 5 [container_controller]
## Opis

Zaimplementuj "dummy container", z poziomu którego będzie mozna dodawać nowe widoki pogodowe dla róznych miast. Kontener jest prostym widokiem rysującym widoki pogodowe. Kontener zarządzany jest przez kontroler.

## Implemantacja
Kod kontrolera:
```js
class WeatherController  {
    #container;
    
    constructor(container) {
        this.#container = container;
        this.#container.setViewCreationCb(city => this.addWheatherView(city));
    }
    
    addNewWheatherView(city) {
        // create the new model for the given city
        //...

        // create the new view and pass the model
        //...

        // pass the new view to the container
        //...

        // fetch model data
        //...
    }
}
```

Kod kontenera:
```js
export default class WeatherViewContainer {
    //...
    #template = `<div class="weather-view-container">
        <div class="weather-views"></div>
        <input type="text" class="city-name-input" placeholder="Enter city name" />
        <div class="weather-view-add">Add new view</div>
    </div>`;

    constructor() {
        //...
    }

    addNewWeatherView(view) {
        //...
    }

    render() {
        //..
    }

    setViewCreationCb(cb) {
        //...
    }

    getEl() {
        return this.#el;
    }

    #createEl() {
        //...
    }

    #addNewViewHandler() {
        //...
    }
}

```

## Użycie

```html
<body>
    <script type="module">
        import WeatherViewContainer from "./container.mjs";
        import WeatherController from "./controller.mjs";
        import CurrentTimeWeatherModel from "../model_event/modelEvent.mjs";

        const weatherContainer = new WeatherViewContainer;
        document.body.appendChild(weatherContainer.getEl());

        const weatherController = new WeatherController(weatherContainer);
    </script>
</body>
```
