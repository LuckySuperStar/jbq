import React,{Component} from 'react';
import {Text, View, StyleSheet,TextInput} from "react-native";
import DataStore from '../expand/dao/DataStore';

type props = {};
export default class DataStoreDemoPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showText: '',
        }
        this.dataStore = new DataStore();
    }

    loadData() {
        let url = `https://api.github.com/search/repositories?q=${this.value}`;
        this.dataStore.fetchData(url)
            .then(data => {
                // 时间是long类型的,通过new Date把时间format一下
                let showData = `初次数据加载时间：${new Date(data.timestamp)}\n${JSON.stringify(data.data)}`;
                this.setState({
                    showText: showData,
                })
            })
            .catch(error => {
                error && console.log(error.toString());
            })
    }
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>离线缓存框架设计</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => {
                        this.value = text;
                    }}
                />
                <Text onPress={() => {
                    this.loadData();
                }}>获取</Text>
                <Text>
                    {this.state.showText}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        // alignItems: 'center', // 水平居中
        // justifyContent: 'center',  // 垂直居中
        backgroundColor: '#F5FCFF',
        // marginTop: 30,
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    input: {
        height: 30,
        borderColor: 'black',
        borderWidth: 1,
        marginRight: 10,
    },
    input_container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});



