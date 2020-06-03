import {Container, Service} from "typedi";
import {WeatherLocationModel} from "../model/weather.model";
import cityList from "../data/city.list.json"
import {plainToClass} from "class-transformer";
import {WEATHER_CONFIG, WEATHER_UNIT} from "../constant/weather.constant";
import {HttpService} from "../core-services/http.service";
import {WeatherSearchDTO, WeatherSearchResponseDTO} from "../dto/weather/weather.search.dto";
import {API_KEY} from "../constant/config.constant";
import {ILazyObservable, lazyObservable} from "mobx-utils";

@Service()
export class WeatherService {
    private readonly httpService = Container.get(HttpService);
    public currentCity: WeatherLocationModel = new WeatherLocationModel();
    public cities: WeatherLocationModel[] = plainToClass(WeatherLocationModel, cityList as []);

    // TODO: move to BE API
    public searchCity(key: string): WeatherLocationModel[] | undefined {
        const rs = this.cities.filter((item)=> item.name.toLowerCase().includes(key.toLowerCase()));
        return rs.length > WEATHER_CONFIG.MAX_CITY_RECORDS ? rs.splice(0, WEATHER_CONFIG.MAX_CITY_RECORDS) : rs;
    }

    public async getCityWeather(id: string): Promise<WeatherSearchResponseDTO | undefined> {
        return (await this.httpService.request(new WeatherSearchDTO({id, appid: API_KEY.WEATHER, units: WEATHER_UNIT.CELSIUS}))).data;
    }

    public lazyGetCityWeather: ILazyObservable<WeatherSearchResponseDTO | undefined> = lazyObservable<WeatherSearchResponseDTO | undefined>(async (sink) => {
        sink(await this.getCityWeather(this.currentCity.id));
    });
}
