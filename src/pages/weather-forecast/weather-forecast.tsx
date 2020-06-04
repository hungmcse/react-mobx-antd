import * as React from "react";
import {WeatherForecastModel} from "./weather-forecast.model";
import {observer} from "mobx-react";
import {AutoComplete, Col, Row, Spin} from 'antd';
import {WeatherInfoModel} from "../../model/weather.model";
import {UseEffect} from "../../shared/effect"
import defaultStyles from "./weather-forecast.module.scss"
import {WeatherCard} from "../../detail/weather/weather-card.component";

@observer
class WeatherForecast extends React.Component<any> {
    private model = new WeatherForecastModel();

    private get weatherCards() {
        return this.model.weatherInfo.map((item: WeatherInfoModel) =>
            (
                <Col key={item.dt} sm={24} lg={11} xl={5}>
                    <WeatherCard data={item}/>
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
                    className={defaultStyles.citySearch}
                />
                {this.model.isLoading && (<Spin size="default" />)}
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
