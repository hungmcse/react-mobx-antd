import * as React from "react";
import {MasterPageLayout} from "./layout/masterpage/masterpage.layout";
import {Redirect, Route, Switch} from "react-router";
import {ROUTE} from "./route";
import {Spin} from "antd";

export function addPrefixUrl(path: string): string {
    const prefixUrl = "*/";
    return prefixUrl + path;
}

function App() {
    return (
        <>
            <MasterPageLayout>
                <React.Suspense fallback={<div><Spin size="large" /></div>}>
                    <Switch>
                        {/*<Route path={addPrefixUrl(ROUTE.INDEX)} exact={true}*/}
                        {/*       component={React.lazy(() => import("./pages/main/main"))}/>*/}
                        <Route path={addPrefixUrl(ROUTE.WEATHER_FORECAST)} exact={true}
                               component={React.lazy(() => import("./pages/weather-forecast/weather-forecast"))}/>
                        <Route path="*" component={() => <Redirect to={"/" + ROUTE.WEATHER_FORECAST}/>}/>
                    </Switch>
                </React.Suspense>
            </MasterPageLayout>
        </>
    );
}

export default App;
