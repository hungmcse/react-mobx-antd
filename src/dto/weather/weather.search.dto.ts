import {DTO, METHOD} from "../../model/core.model";
import {HTTP_HOST} from "../../constant/config.constant";
import {WeatherInfoModel, WeatherLocationModel} from "../../model/weather.model";
import {WEATHER_UNIT} from "../../constant/weather.constant";

export class WeatherSearchResponseDTO {
    public list!: WeatherInfoModel[];
    public city!: WeatherLocationModel;
}

export class WeatherSearchParamsDTO {
    public id!: string;
    public appid!: string;
    public units!: WEATHER_UNIT
}


export class WeatherSearchDTO extends DTO {

    public readonly url = `${HTTP_HOST.WEATHER}/forecast`;

    public readonly method = METHOD.GET;
    public readonly responseDTOClass = WeatherSearchResponseDTO;

    public paramsDTO: WeatherSearchParamsDTO;
    public bodyDTO: undefined;

    constructor(params: WeatherSearchParamsDTO) {
        super();
        this.paramsDTO = params;
    }
}
