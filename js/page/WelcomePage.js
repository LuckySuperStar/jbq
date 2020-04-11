
import React,{Component} from 'react';
import {Button,Text,StyleSheet,View} from 'react-native';
import NavigationUtil from "../navigator/NavigationUtil";


export default class WelcomePage extends Component {
    componentDidMount() {
        this.timer = setTimeout(() => {
            // 跳转到首页
            NavigationUtil.resetToHomePage(this.props);
        }, 200);
    }
    componentWillMount() {
        // 页面销毁时清空计时器
        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>
                    WelcomePage
                </Text>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // 垂直居中
        alignItems: 'center', // 水平居中
    },
});
