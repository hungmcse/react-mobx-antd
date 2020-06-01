import {action, observable} from "mobx";
import {Container} from "typedi";
import {WeatherService} from "../../services/weather.service";
import {WeatherLocationModel} from "../../model/weather.model";
import {SelectOption} from "../../interface/antd.interface";
import {SelectValue} from "antd/es/select";
import debounce from "lodash.debounce"

export class WeatherForecastModel {
    private weatherService = Container.get(WeatherService);

    @observable
    public options: SelectOption[] = [];

    public getWeatherLocation(query: string) {
        const rs = this.weatherService.getWeatherData(query);
        console.log(rs);
        this.setOption(rs);
    }

    @action.bound
    private setOption(data: WeatherLocationModel[] | undefined): void {
        if (data) {
            this.options = data.map(item => ({value: `${item.id}`, text: item.name}));
        } else {
            this.options = [];
        }
    }

    public selectCity = (value: SelectValue) => {
        console.log(value);
     };

    public searchCity = debounce((e: SelectValue)=> {
            console.log(e);
            this.getWeatherLocation(e as string);
        }, 1000);
}
