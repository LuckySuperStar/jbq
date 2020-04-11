
import {createSwitchNavigator,createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createMaterialTopTabNavigator,createBottomTabNavigator} from 'react-navigation-tabs';
import WelcomePage from "../page/WelcomePage";
import HomePage from "../page/HomePage";
import DetailPage from "../page/DetailPage";
import FetchDemoPage from "../page/FetchDemoPage";
import AsyncStorageDemoPage from "../page/AsyncStorageDemoPage";
import DataStoreDemoPage from '../page/DataStoreDemoPage';


const InitNavigator = createStackNavigator(
    {
        WelcomePage: {
            screen: WelcomePage,
            navigationOptions: {
                header: null,
            },
        },
    },
);
const MainNavigator = createStackNavigator(
    {
        HomePage: {
            screen: HomePage,
            navigationOptions: {
                header: null,
            },
        },
        DetailPage: DetailPage,
        FetchDemoPage: {
            screen: FetchDemoPage,
            navigationOptions: {
                header: null,
            },
        },
        AsyncStorageDemoPage: {
            screen: AsyncStorageDemoPage,
            navigationOptions: {
                header: null,
            },
        },
        DataStoreDemoPage: {
            screen: DataStoreDemoPage,
            navigationOptions: {
                // header: null,
            },
        },
    },
);
export default createAppContainer(createSwitchNavigator(
    {
        Init: InitNavigator,
        Main: MainNavigator,
    },
    {
        navigationOptions: {
            header: null,
        },
    },
));
