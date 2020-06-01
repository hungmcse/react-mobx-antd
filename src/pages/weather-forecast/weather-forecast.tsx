import * as React from "react";
import {WeatherForecastModel} from "./weather-forecast.model";
import {observer} from "mobx-react";
import { AutoComplete } from 'antd';
@observer
class WeatherForecast extends React.Component<any> {
    private model = new WeatherForecastModel();

    render(): React.ReactNode {
        return (
            <div>
                <AutoComplete
                    dataSource={this.model.options}
                    style={{ width: 200 }}
                    onSelect={this.model.selectCity}
                    onSearch={this.model.searchCity}
                    placeholder="input here"
                />
            </div>
        );
    }
}

export default WeatherForecast;
