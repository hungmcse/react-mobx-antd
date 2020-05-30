import React, {Suspense} from 'react';
import defaultStyle from './App.module.scss';
import {MasterPageLayout} from "./layout/masterpage/masterpage.layout";
import {Redirect, Route, Switch} from "react-router";
import {ROUTE} from "./route";

export function addPrefixUrl(path: string): string {
    const prefixUrl = "*/";
    return prefixUrl + path;
}

function App() {
    return (
        <div className={defaultStyle.App}>
            <MasterPageLayout>
                <Suspense fallback={<div>Loading...</div>}>
                    <Switch>
                        <Route path={addPrefixUrl(ROUTE.INDEX)} exact={true}
                               component={React.lazy(() => import("./pages/main/main"))}/>
                        <Route path={addPrefixUrl(ROUTE.WEATHER_FORECAST)} exact={true}
                               component={React.lazy(() => import("./pages/weather-forecast/weather-forecast"))}/>
                        <Route path="*" component={() => <Redirect to={"/" + ROUTE.INDEX}/>}/>
                    </Switch>
                </Suspense>
            </MasterPageLayout>
        </div>
    );
}

export default App;
