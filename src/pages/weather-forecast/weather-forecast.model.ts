import {action, observable, reaction} from "mobx";
import {Container} from "typedi";
import {WeatherService} from "../../services/weather.service";
import {WeatherInfoModel, WeatherLocationModel} from "../../model/weather.model";
import {SelectValue} from "antd/es/select";
import debounce from "lodash.debounce"
import {DataSourceItemObject} from "antd/es/auto-complete";
import moment from "moment";

export class WeatherForecastModel {
    private weatherService = Container.get(WeatherService);

    @observable
    public cityOptions: DataSourceItemObject[] = [];

    @observable
    public weatherInfo: WeatherInfoModel[] = [];

    public getWeatherLocation(query: string) {
        const rs = this.weatherService.searchCity(query);
        this.setOption(rs);
    }

    public effect = (): () => void => {
        const weatherDisposer = reaction(() => this.weatherService.lazyGetCityWeather.pending, (pending) => {
            if (!pending && this.weatherService.lazyGetCityWeather.current()) {
                this.setWeatherInfo(this.weatherService.lazyGetCityWeather.current()!.list);
            }
        });
        return () => {
            weatherDisposer();
        }
    };

    @action.bound
    private setOption(data: WeatherLocationModel[] | undefined): void {
        if (data) {
            this.cityOptions = data.map(item => ({value: `${item.id}`, text: item.name}));
        } else {
            this.cityOptions = [];
        }
    }

    @action.bound
    public selectCity = (value: SelectValue) => {
        this.weatherService.currentCity.id = value as string;
        this.weatherService.lazyGetCityWeather.current() ? this.weatherService.lazyGetCityWeather.refresh() : this.weatherService.lazyGetCityWeather.current();
    };

    @action.bound
    public setWeatherInfo(weatherInfo: WeatherInfoModel[]) {
        const map = new Map<number, WeatherInfoModel>();
        for (let i of weatherInfo) {
            const index = moment.unix(i.dt).get("date");
            if (!map.get(index)) {
                map.set(index, i);
            }
            if (map.size === 5) {
                break;
            }
        }
        this.weatherInfo = Array.from(map.values());
    }

    public searchCity = debounce((e: SelectValue) => {
        this.getWeatherLocation(e as string);
    }, 1000);
}
