import cfg from "../cfg.mjs";
import { EventEmitter } from "../event_emitter/eventEmitter.mjs";

export default class CurrentTimeWeatherModel extends EventEmitter {
    #urlFormat = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid=${cfg?.openWeatherMap.key}&units=metric`;
    #abortController;
    #weatherDetails; // {data: ..., error: ...}

    async update(city, cancel = false) {
        if(this.#abortController && cancel) {
            this.#abortController.abort();
        }

        this.#abortController = new AbortController;
        try {
            const resp = await fetch(this.#urlFormat.replace("{city}", city), {
                signal: this.#abortController.signal,
            });

            if (!resp.ok) {
                const errMsg = `Fetch failed, status: ${resp.status}`;
                this.#weatherDetails = {
                    data: null,
                    error: errMsg,
                };
                this.dispatch("error");
                return;
            }
            const respWeatherData = await resp.json();
            this.#weatherDetails = {
                data: {
                    city: respWeatherData.name,
                    temp: respWeatherData.main.temp,
                    windSpeed: respWeatherData.wind.speed,
                    icon: respWeatherData.weather[0].icon,
                },
                error: null,
            }
            this.dispatch("load");
        } catch(err) {
            this.#weatherDetails = {
                data: null,
                error: err.message,
            };
            this.dispatch("error");
        }
    }

    toJSON() {
        return {...this.#weatherDetails};
    }
}

// const currTimeWeatherModel = new CurrentTimeWeatherModel;
// currTimeWeatherModel.update("Poznan");
// currTimeWeatherModel.update("Warsaw", true);
