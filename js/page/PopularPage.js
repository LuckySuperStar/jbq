
import React,{Component} from 'react'
import {Text, View, StyleSheet, Button, FlatList,RefreshControl} from "react-native";
import {connect} from 'react-redux';
import actions from '../action/index';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs'
import {createAppContainer} from 'react-navigation'
import NavigatorUtil from "../navigator/NavigationUtil";
import AsyncStorageDemoPage from "./AsyncStorageDemoPage";
import {Type} from "react-native/ReactCommon/hermes/inspector/tools/msggen/src/Type";

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR ='red';

type Props = {};
export default class PopularPage extends Component {
    constructor(props) {
        super(props);
        this.tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];
    }
    _genTabs() {
        const tabs={};
        this.tabNames.forEach((item, index) => {
            tabs[`tab${index}`]= {
                screen: props => <PopularTabPage {...props} tabLabel={item}/>,
                navigationOptions: {
                    title: item,
                },
            };
        });
        return tabs;
    }
    render() {
        const TabNavigator = createAppContainer(createMaterialTopTabNavigator(
            this._genTabs(),
            {
                tabBarOptions: {
                    tabStyle:styles.tabStyle,
                    upperCaseLabel: false,
                    scrollEnabled: true,
                    style: {
                        backgroundColor: '#a67'
                    },
                    indicatorStyle: styles.indicatorStyle,
                    labelStyle: styles.labelStyle,

                }
            }
        ));
        return (
            <View style={styles.container}>
                <TabNavigator/>
            </View>
        );
    }
}

class PopularTab extends Component {
    constructor(props) {
        super(props);
        const {tabLabel}=this.props;
        this.storeName=tabLabel;
    }
    componentDidMount() {
        this.loadData();
    }
    loadData() {
        const {onLoadPopularData} = this.props;
        const url = this.genFetchUrl(this.storeName);
        onLoadPopularData(this.storeName,url);
    }
    genFetchUrl(key) { // QUERY_STR排序规则
        return URL + key +QUERY_STR;
    }
    renderItem() {
        const item = data.item;
        return <View style={{marginBottom: 10}}>
            <Text style={{backgroundColor: "#faa"}}>
                {JSON.stringify(item)}
            </Text>
        </View>
    }

    render() {
        const {popular} = this.props;
        let store= popular[this.storeName];// 动态获取state
        if (!store) {
            store = {
                items: [],
                isLoading: false,
            }
        }
        return(
            <View style = {styles.container}>
                <FlatList
                    data={store.items}
                    renderItem={data=>this.renderItem(data)}
                    keyExtractor={item=>""+item.id}
                    refreshControl={
                        <RefreshControl
                            title={'Loading'}
                            titleColor={THEME_COLOR}
                            colors={[THEME_COLOR]}
                            refreshing={store.isLoading}
                            // 触发下拉刷新的时候回到这个函数,回调onRefresh
                            onRefresh={()=>this.loadData()}
                            tintColor={THEME_COLOR}
                        />
                    }
                />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    popular: state.popular
});
const mapDispatchToProps = dispatch => ({
    onLoadPopularData: (storeName, url) => dispatch(actions.onLoadPopularData(storeName,url))
});
const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab);

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        marginTop: 30,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    tabStyle: {
        minWidth: 50,
    },
    indicatorStyle: {
        height: 2,
        backgroundColor: 'white'
    },
    labelStyle: {
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
    }
});
