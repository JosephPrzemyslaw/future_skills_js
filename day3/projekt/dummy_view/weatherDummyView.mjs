export default class WeatherDummyView {
    #el;
    #weatherModel;
    #iconSrc = "https://openweathermap.org/img/wn/{{iconSrc}}@4x.png"
    #template = `<div class='dummy-view'>
        <div class='dummy-view-error'></div>
        <div class='dummy-view-data'>
            <div class='dummy-view-city'></div>
            <div class='dummy-view-icon'><img /></div>
            <div class='dummy-view-temp'></div>
            <div class='dummy-view-windSpeed'></div>
        </div>
    </div>`;
    #cityEl; #iconEl; #tempEl; #windSpeedEl;

    constructor(weatherModel) {
        this.#weatherModel = weatherModel;
        this.#createEl();
        this.#createRefs();

        this.#weatherModel.on("load", () => this.render());
        this.#weatherModel.on("error", () => this.render());
    }

    render() {
        const weatherModel = this.#weatherModel.toJSON(); // {data: ..., error: ...}
        const errorEl = this.#el.querySelector(".dummy-view-error");
        const contentEl = this.#el.querySelector(".dummy-view-data"); 

        if (weatherModel.error) {
            contentEl.classList.add("hide");
            errorEl.classList.remove("hide");
            errorEl.textContent = weatherModel.error;
        } else {
            errorEl.classList.add("hide");
            contentEl.classList.remove("hide");
            this.#cityEl.textContent = weatherModel.data.city;
            this.#iconEl.src = this.#iconSrc.replace("{{iconSrc}}", weatherModel.data.icon);
            this.#tempEl.textContent = weatherModel.data.temp;
            this.#windSpeedEl.textContent = weatherModel.data.windSpeed;
        }
    }

    getEl() {
        return this.#el;
    }

    #createEl() {
        const templateEl = document.createElement("template");
        templateEl.innerHTML = this.#template;
        this.#el = templateEl.content.firstElementChild;
    }

    #createRefs() {
        this.#cityEl = this.#el.querySelector(".dummy-view-city");
        this.#iconEl = this.#el.querySelector(".dummy-view-icon img");
        this.#tempEl = this.#el.querySelector(".dummy-view-temp");
        this.#windSpeedEl = this.#el.querySelector(".dummy-view-windSpeed");
    }
}
