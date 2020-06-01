import {Service} from "typedi";
import {WeatherLocationModel} from "../model/weather.model";
import cityList from "../data/city.list.json"
import {plainToClass} from "class-transformer";
import {WEATHER_CONFIG} from "../constant/weather.constant";

@Service()
export class WeatherService {
    public cities: WeatherLocationModel[] = plainToClass(WeatherLocationModel, cityList as []);
    // TODO: move to BE API
    public getWeatherData(key: string): WeatherLocationModel[] | undefined {
        const rs = this.cities.filter((item)=> item.name.toLowerCase().includes(key.toLowerCase()));
        return rs.length > WEATHER_CONFIG.MAX_CITY_RECORDS ? rs.splice(0, WEATHER_CONFIG.MAX_CITY_RECORDS) : rs;
    }
}
