import {observable} from "mobx";
import {WEATHER_TYPE} from "../constant/weather.constant";

export class WeatherLocationModel {
    @observable
    public id!: string;
    public name!: string;
    public state!: string;
    public country!: string;
    public coord!: string;
}

export class WeatherInfoModel {
    public main!: {
        temp: number,
        humidity: number,
        temp_max: number,
        temp_min: number,
    };
    public dt!: number;

    public weather!: Array<{id: number, main: WEATHER_TYPE, description: string}>
}
