import cfg from "../cfg.mjs";

export default class CurrentTimeWeatherModel {
    #urlFormat = `https://api.openweathermap.org/data/2.5/weather?q={city}&appid=${cfg?.openWeatherMap.key}&units=metric`;
    #abortController;
    #weatherDetails; // {data: ..., error: ...}

    async update(city, cancel = false) {
        console.log("Request:", city);

        if(this.#abortController && cancel) {
            this.#abortController.abort();
        }

        this.#abortController = new AbortController;
        try {
            const resp = await fetch(this.#urlFormat.replace("{city}", city), {
                signal: this.#abortController.signal,
            });

            if (!resp.ok) {
                this.#weatherDetails = {
                    data: null,
                    error: `Fetch failed, status: ${resp.status}`,
                };
                console.log("Request handled, error:", city);
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
            console.log("Request handled:", city);
        } catch(err) {
            this.#weatherDetails = {
                data: null,
                error: err.message,
            };
            console.log("Request handled, error:", city);
        }

        // fetch(this.#urlFormat.replace("{city}", city))
        // .then(resp => {
        //     if (!resp.ok) {
        //         this.#weatherDetails = {
        //             data: null,
        //             error: `Fetch failed, status: ${resp.status}`,
        //         };
        //         return;
        //     }
        //     return resp.json();
        // })
        // .then(respWeatherData => {
        //     this.#weatherDetails = {
        //         data: {
        //             city: respWeatherData.name,
        //             temp: respWeatherData.main.temp,
        //             windSpeed: respWeatherData.wind.speed,
        //             icon: respWeatherData.weather[0].icon,
        //         },
        //         error: null,
        //     };
        // })
        // .catch(err => {
        //     this.#weatherDetails = {
        //         data: null,
        //         error: `Fetch failed: ${err.message}`,
        //     };
        // });
    }

    toJSON() {
        return {...this.#weatherDetails};
    }
}

const currTimeWeatherModel = new CurrentTimeWeatherModel;
currTimeWeatherModel.update("Poznan");
currTimeWeatherModel.update("Warsaw", true);
