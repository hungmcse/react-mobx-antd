import * as React from "react";
import {WeatherForecastModel} from "./weather-forecast.model";
import {observer} from "mobx-react";
import {AutoComplete, Card, Col, Row} from 'antd';
import {WeatherInfoModel} from "../../model/weather.model";
import Meta from "antd/es/card/Meta";
import {UseEffect} from "../../shared/effect"
import {WEATHER_IMAGE_MAP} from "../../constant/weather.constant";
import moment from "moment"
import {TIME_FORMAT} from "../../constant/config.constant";
import defaultStyles from "./weather-forecast.module.scss"

@observer
class WeatherForecast extends React.Component<any> {
    private model = new WeatherForecastModel();

    private get weatherCards() {
        return this.model.weatherInfo.map((item: WeatherInfoModel) =>
            (
                <Col key={item.dt} sm={24} lg={11} xl={5}>
                    <Card cover={<img alt="" src={`./svg/${WEATHER_IMAGE_MAP[item.weather[0].main]}`}/>}
                    >
                        <Meta
                            title={
                                (<>
                                    <div>{item.weather[0].main}</div>
                                    <div>{moment.unix(item.dt).format(TIME_FORMAT.DEFAULT)}</div>
                                </>)
                            }
                            description={<p>{`Temperature: ${item.main.temp_min} ℃ ~ ${item.main.temp_max} ℃`}</p>}
                        />
                    </Card>
                </Col>
            )
        )
    }

    render(): React.ReactNode {
        return (
            <>
                <UseEffect effect={this.model.effect}/>
                <span>City: </span>
                <AutoComplete
                    dataSource={this.model.cityOptions}
                    style={{width: 200}}
                    onSelect={this.model.selectCity}
                    onSearch={this.model.searchCity}
                    placeholder="input here"
                />
                <div className={defaultStyles.weatherInfoContainer}>
                    <Row type={"flex"} justify={"center"} gutter={[20, 20]}>
                        {this.weatherCards}
                    </Row>
                </div>
            </>
        );
    }
}

export default WeatherForecast;
