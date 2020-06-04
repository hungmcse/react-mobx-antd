import * as React from "react";
import {shallow} from "enzyme";
import {WeatherCard} from "./weather-card.component";
import {WeatherInfoModel} from "../../model/weather.model";
import {WEATHER_TYPE} from "../../constant/weather.constant";

describe("Test weather forecast card component ", () => {
    const weatherInfoModel: WeatherInfoModel = {
        dt: 1591251103,
        main: {
            temp_max: 40,
            temp_min: 20,
            temp: 33,
            humidity: 20
        },
        weather: [{id: 802,  main: WEATHER_TYPE.CLEAR, description: "scattered clouds"}]
    };

    test("Test default render", () => {
        const wrapper = shallow(<WeatherCard data={weatherInfoModel}/>);
        expect(wrapper.find('Card').length).toBe(1);
    });

    test("Test weather detail render with no data", () => {
        const wrapper = shallow(<WeatherCard data={{...weatherInfoModel, weather: []}}/>);
        expect(wrapper.find('Card').length).toBe(0);
    });

    test("Test no weather detail exist", () => {
        const testModel = {...weatherInfoModel};
        delete testModel.weather;
        const wrapper = shallow(<WeatherCard data={testModel}/>);
        expect(wrapper.find('Card').length).toBe(0);
    });
});
