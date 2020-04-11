
import React,{Component} from 'react'
import {Text,View,StyleSheet,Button} from "react-native";
import {connect} from 'react-redux';
import actions from '../action'


class TrendingPage extends Component {
    render() {
        const {navigation} = this.props;
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>TrendingPage</Text>
                <Button
                    title={'修改主题'}
                    onPress={() => this.props.onThemeChange('orange')}
                />
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
export default connect(null,mapDispatchToProps)(TrendingPage);
