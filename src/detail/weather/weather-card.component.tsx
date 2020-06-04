import {WeatherInfoModel} from "../../model/weather.model";
import * as React from "react";
import {Card, Col, Row} from "antd";
import {WEATHER_IMAGE_MAP} from "../../constant/weather.constant";
import Meta from "antd/es/card/Meta";
import moment from "moment";
import {TIME_FORMAT} from "../../constant/config.constant";
import defaultStyle from "./weather-card.module.scss"

export interface IProps {
    data: WeatherInfoModel
}

export function WeatherCard(props: IProps): React.ReactElement<IProps> | null {
    return props.data.weather && props.data.weather[0] && (
        <Card cover={<img alt="" src={`./svg/${WEATHER_IMAGE_MAP[props.data.weather[0].main]}`}/>}>
            <Meta
                title={
                    (<>
                        <Row justify="space-between" type="flex">
                            <Col span={12}><div>{props.data.weather[0].main}</div></Col>
                            <Col span={12}><div className={defaultStyle.weatherDescription}>{props.data.weather[0].description}</div> </Col>
                        </Row>

                        <div>{moment.unix(props.data.dt).format(TIME_FORMAT.DEFAULT)}</div>
                    </>)
                }
                description={<p>{`Temperature: ${props.data.main.temp_min} ℃ ~ ${props.data.main.temp_max} ℃`}</p>}
            />
        </Card>
    );
}
