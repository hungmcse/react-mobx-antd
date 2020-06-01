import {DTO, METHOD} from "../../model/core.model";
import {HTTP_HOST} from "../../constant/config.constant";
import {WEATHER_LOCATION_TYPE} from "../../constant/weather.constant";

export class WeatherLocationSearchResponseDTO {
    public title!: string;
    public location_type!: WEATHER_LOCATION_TYPE;
    public woeid!: number;
    public latt_long!: string
}

export class WeatherLocationSearchParamsDTO {
    public id!: string;
    public appid!: string;
    public cnt!: number;
}


export class WeatherLocationSearchDTO extends DTO {

    public readonly url = `${HTTP_HOST.WEATHER}/forecast/daily`;

    public readonly method = METHOD.GET;
    public readonly responseDTOClass = WeatherLocationSearchResponseDTO;

    public paramsDTO: WeatherLocationSearchParamsDTO;
    public bodyDTO: undefined;

    constructor(params: WeatherLocationSearchParamsDTO) {
        super();
        this.paramsDTO = params;
    }
}
