
import React,{Component} from 'react'
import {Text,View,StyleSheet,Button} from "react-native";


export default class DetailPage extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>DetailPage</Text>
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
