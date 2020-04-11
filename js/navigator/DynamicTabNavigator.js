import React from 'react';
import PopularPage from "../page/PopularPage";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import TrendingPage from "../page/TrendingPage";
import Ionicons from "react-native-vector-icons/Ionicons";
import FavoritePage from "../page/FavoritePage";
import MyPage from "../page/MyPage";
import Entypo from "react-native-vector-icons/Entypo";
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator,BottomTabBar} from 'react-navigation-tabs';
import {connect} from 'react-redux';

// 动态设置底部导航
//这是一个配置,所以可以通过服务端对它进行下发
const TABS = { // 在这里配置页面路由
    PopularPage: {
        screen: PopularPage,
            navigationOptions: {
            tabBarLabel: '最热',
                tabBarIcon: ({tintColor,focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color : tintColor}}
                />
            ),
        },
    },
    TrendingPage: {
        screen: TrendingPage,
            navigationOptions: {
            tabBarLabel: '趋势',
                tabBarIcon: ({tintColor,focused}) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color : tintColor}}
                />
            ),
        },
    },
    FavoritePage: {
        screen: FavoritePage,
            navigationOptions: {
            tabBarLabel: '收藏',
                tabBarIcon: ({tintColor,focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color : tintColor}}
                />
            ),
        },
    },
    MyPage: {
        screen: MyPage,
            navigationOptions: {
            tabBarLabel: '我的',
                tabBarIcon: ({tintColor,focused}) => (
                <Entypo
                    name={'user'}
                    size={26}
                    style={{color : tintColor}}
                />
            ),
        },
    },
}

class DynamicTabNavigator extends React.Component {
    constructor(props) {
        super(props);
        console.disableYellowBox = true; // 关闭黄色警告弹框
    }
    _tabNavigaor() {
        if (this.Tabs) { // 如果导航器不为空直接返回
            return this.Tabs;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = TABS;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage}; //显示的导航
        PopularPage.navigationOptions.tabBarLabel = '最热1' // 动态修改Tabs属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(
            tabs,{
                tabBarComponent: props => {
                    return <TabBarComponent {...props} theme={this.props.theme}/>
                },
            }
        ));
    }
    render() {
        const Tab = this._tabNavigaor();
        return <Tab/>;
    }
}
class TabBarComponent extends React.Component {
    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor = {this.props.theme}
        />;
    }
}
// redux的state到页面props的转换
const mapStateToProps = state => ({
    theme: state.theme.theme,
});
// 当前组件到我们的redux的连接,这样就完成了当前组件和redux的store关联起来,这样它theme的变化就及时反馈到组件props里面去
export default connect(mapStateToProps)(DynamicTabNavigator);
