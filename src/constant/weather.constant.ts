export enum WEATHER_LOCATION_TYPE {
    CITY = "City",
    REGION = "Region / State / Province",
    COUNTRY = "Country",
    CONTINENT = "Continent"
}

export enum WEATHER_TYPE {
    RAIN = "Rain",
    SNOW = "Snow",
    CLOUDS = "Clouds",
    CLEAR = "Clear",
}

export enum WEATHER_UNIT {
    CELSIUS= "metric",
    FAHRENHEIT = "imperial",
}

export const  WEATHER_CONFIG = {
    MAX_CITY_RECORDS: 50
};

export const  WEATHER_IMAGE_MAP: Record<WEATHER_TYPE, string> = {
    [WEATHER_TYPE.RAIN]: "rain-weather.svg",
    [WEATHER_TYPE.SNOW]: "snow-weather.svg",
    [WEATHER_TYPE.CLOUDS]: "clouds-weather.svg",
    [WEATHER_TYPE.CLEAR]: "clear-weather.svg",
}
