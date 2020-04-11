
import React,{Component} from 'react'
import {Text, View, StyleSheet, Button} from "react-native";
import actions from "../action";
import {connect} from "react-redux";
import NavigatorUtil from "../navigator/NavigationUtil";


class MyPage extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>MyPage</Text>
                <Button
                    title={'修改主题'}
                    onPress={() => this.props.onThemeChange('green')}
                />
                <Text onPress={
                    () => {
                        NavigatorUtil.goPage({},'DetailPage');
                    }
                }>跳转到详情页
                </Text>
                <Button
                    title = 'Fetch 使用'
                    onPress={() => {
                        NavigatorUtil.goPage({
                            navigation: this.props.navigation,
                        },'FetchDemoPage');
                    }}/>
                <Button
                    title = 'AsyncStorage 使用'
                    onPress={() => {
                        NavigatorUtil.goPage({
                            navigation: this.props.navigation,
                        },'AsyncStorageDemoPage');
                    }}/>
                <Button
                    title = '离线缓存框架'
                    onPress={() => {
                        NavigatorUtil.goPage({
                            navigation: this.props.navigation,
                        },'DataStoreDemoPage');
                    }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: 'center', // 水平居中
        justifyContent: 'center',  // 垂直居中
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    }
});
const mapDispatchToProps=dispatch => ({
    onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});
export default connect(null,mapDispatchToProps)(MyPage);
