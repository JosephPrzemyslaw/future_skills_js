import WeatherDummyView from "../dummy_view/weatherDummyView.mjs";
import CurrentTimeWeatherModel from "../model_event/currentTimeWeatherModel.mjs";

export default class WeatherController  {
    #container;
    
    constructor(container) {
        this.#container = container;
        this.#container.setViewCreationCb(city => this.addWheatherView(city));
    }
    
    addWheatherView(city) {
        // create the new model for the given city
        const wm = new CurrentTimeWeatherModel;

        // create the new view and pass the model
        const wv = new WeatherDummyView(wm);

        // pass the new view to the container
        this.#container.addNewWeatherView(wv);

        // fetch model data
        wm.update(city);
    }
}

