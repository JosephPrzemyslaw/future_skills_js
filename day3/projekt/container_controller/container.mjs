export default class WeatherViewContainer {
    #el;
    #viewCreationCb;
    #template = `<div class="weather-view-container">
        <div class="weather-views"></div>
        <input type="text" class="city-name-input" placeholder="Enter city name" />
        <div class="weather-view-add">Add new view</div>
    </div>`;

    constructor() {
        this.#createEl();
        this.#addNewViewHandler();
    }

    addNewWeatherView(view) {
        this.#el.querySelector(".weather-views").appendChild(view.getEl());
    }

    setViewCreationCb(cb) {
        this.#viewCreationCb = cb;
    }

    getEl() {
        return this.#el;
    }

    #createEl() {
        const template = document.createElement("template");
        template.innerHTML = this.#template;
        this.#el = template.content.firstElementChild;
    }

    #addNewViewHandler() {
        this.#el.querySelector(".weather-view-add").addEventListener("click", () => {
            const cityInput = this.#el.querySelector(".city-name-input");
            this.#viewCreationCb(cityInput.value);
        });
    }
}
