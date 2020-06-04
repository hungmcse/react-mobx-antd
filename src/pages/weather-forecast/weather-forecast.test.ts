import {WeatherForecastModel} from "./weather-forecast.model";
import {WeatherInfoModel} from "../../model/weather.model";
import {WEATHER_TYPE} from "../../constant/weather.constant";

describe("Test weather forecast model functions", () => {
    const model = new WeatherForecastModel();
    const locationTestData: WeatherInfoModel[] = [{
        dt: 1591207200,
        main: {
            temp: 27.31,
            temp_min: 27.31,
            temp_max: 27.63,
            humidity: 84,
        },
        weather: [{id: 501, main: WEATHER_TYPE.RAIN, description: "moderate rain"}],

    }, {
        dt: 1591293600,
        main: {
            temp: 27.31,
            temp_min: 27.31,
            temp_max: 27.63,
            humidity: 84,
        },
        weather: [{id: 501, main: WEATHER_TYPE.SNOW, description: "moderate rain"}],
    }, {
        dt: 1591380000,
        main: {
            temp: 27.31,
            temp_min: 27.31,
            temp_max: 27.63,
            humidity: 84,
        },
        weather: [{id: 501, main: WEATHER_TYPE.CLEAR, description: "moderate rain"}],
    }, {
        dt: 1591466400,
        main: {
            temp: 27.31,
            temp_min: 27.31,
            temp_max: 27.63,
            humidity: 84,
        },
        weather: [{id: 501, main: WEATHER_TYPE.CLEAR, description: "moderate rain"}],
    }, {
        dt: 1592244000,
        main: {
            temp: 27.31,
            temp_min: 27.31,
            temp_max: 27.63,
            humidity: 84,
        },
        weather: [{id: 501, main: WEATHER_TYPE.CLEAR, description: "moderate rain"}],
    }, {
        dt: 1592248000,
        main: {
            temp: 27.31,
            temp_min: 27.31,
            temp_max: 27.63,
            humidity: 84,
        },
        weather: [{id: 501, main: WEATHER_TYPE.CLEAR, description: "moderate rain"}],
    }];

    test("Test inputting info model with length of 6", () => {
        model.setWeatherInfo(locationTestData);
        expect(model.weatherInfo).toHaveLength(5);
    });

    test("Test inputting empty array", () => {
        model.setWeatherInfo([]);
        expect(model.weatherInfo).toHaveLength(0);
    });

    test("Test inputting info model with oversize array", () => {
        model.setWeatherInfo([...locationTestData, ...locationTestData]);
        expect(model.weatherInfo).toHaveLength(5);
    });

    test("Test inputting info model with length less than 5", () => {
        model.setWeatherInfo(locationTestData.splice(0, 3));
        expect(model.weatherInfo).toHaveLength(3);
    });
});
