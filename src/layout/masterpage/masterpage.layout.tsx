import {Layout, Menu, Icon} from "antd";
import * as React from "react";
import defaultStyles from "./masterpage.module.scss"
import {ROUTE} from "../../route";
import {HistoryService} from "../../core-services/history.service";
import {Container} from "typedi";

interface IProps {
    children: React.ReactNode
}

const {Header, Footer, Sider, Content} = Layout;

const selectMenu = (route: ROUTE): void => {
    const historyService = Container.get(HistoryService);
    historyService.push(route);
};

const getSelectedMenu = (route: ROUTE): ROUTE[] => {
    const historyService = Container.get(HistoryService);
    const item = Object.values(ROUTE).find((route) => historyService.history.location.pathname.startsWith(`/${route}`));
    return [item ? item : route];
};

export function MasterPageLayout(props: IProps): React.ReactElement<IProps> {
    return (
        <Layout className={defaultStyles.layout}>
            <Header>
                <div className={defaultStyles.logo}>HungMC</div>
            </Header>
            <Layout>
                <Sider>
                    <Menu defaultSelectedKeys={getSelectedMenu(ROUTE.WEATHER_FORECAST)} onSelect={({key}) => selectMenu(key as ROUTE)}
                          theme="dark" mode="inline">
                        {/*<Menu.Item key={ROUTE.INDEX}>*/}
                        {/*    <Icon type="desktop"/>*/}
                        {/*    Index*/}
                        {/*</Menu.Item>*/}
                        <Menu.Item key={ROUTE.WEATHER_FORECAST}>
                            <Icon type="desktop"/>
                            Weather
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Content>
                    <div className={defaultStyles.content}>
                        {props.children}
                    </div>
                </Content>
            </Layout>
            <Footer className={defaultStyles.footer}>HungMC Test Project</Footer>
        </Layout>
    )
}
