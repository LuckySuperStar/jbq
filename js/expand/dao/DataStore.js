// import {AsyncStorage} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export default class DataStore {

    fetchData(url) {
        return new Promise((resolve, reject) => {
            this.fetchLocalData(url).then((wrapData) => {
                if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
                    resolve(wrapData);
                } else {
                    this.fetchNetData(url).then((data) => {
                        resolve(this._wrapData(data));
                    }).catch((error) => {
                        reject(error);
                    })
                }
            }).catch((error) => {
                this.fetchNetData(url).then((data) => {
                    resolve(this._wrapData(data));
                }).catch((error => {
                    reject(error);
                }))
            })
        })
    }

    /**
     * 保存数据
     * @param url
     * @param data
     * @param callback
     */
    saveData(url, data, callback) {
        if (!data || !url) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
    }
    // saveData = async () => {
    //     try {
    //         await AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)),callback);
    //     } catch (e) {
    //         // saving error
    //     }
    // }


    // 打时间戳
    _wrapData(data) {
        return {data: data, timestamp: new Date().getTime()};
    }
    // 获取本地数据
    fetchLocalData(url) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(url, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result));
                    } catch (e) {
                        reject(e);
                        console.error(e);
                    }
                } else {
                    reject(error);
                    console.error(error);
                }
            })
        })
    }

    // fetchNetData(url, flag) {
    //     return new Promise((resolve, reject) => {
    //         if (flag !== FLAG_STORAGE.flag_trending) {
    //             fetch(url)
    //                 .then((response) => {
    //                     if (response.ok) {
    //                         return response.json();
    //                     }
    //                     throw new Error('Network response was not ok.');
    //                 })
    //                 .then((responseData) => {
    //                     this.saveData(url, responseData)
    //                     resolve(responseData);
    //                 })
    //                 .catch((error) => {
    //                     reject(error);
    //                 })
    //         } else {
    //             new Trending().fetchTrending(url)
    //                 .then(items => {
    //                     if (!items) {
    //                         throw new Error('responseData is null');
    //                     }
    //                     this.saveData(url, items);
    //                     resolve(items);
    //                 })
    //                 .catch(error => {
    //                     reject(error);
    //                 })
    //         }
    //     })
    // }
    // 获取网络数据
    fetchNetData(url) {
        return new Promise((resolve, reject) => {
            fetch(url)
                .then((response) => {
                    if (response.ok) {
                        return response.json();
                    }
                    throw new Error('Network response was not ok.');
                })
                .then((responseData) => {
                    this.saveData(rul, responseData)
                    resolve(responseData);
                })
                .catch((error) => {
                    reject(error);
                })
        })
    }
    /**
     * 检查timestamp是否在有效期内
     * @param timestamp 项目更新时间
     * @return {boolean} true 不需要更新,false需要更新
     */
    static checkTimestampValid(timestamp) {
        const currentDate = new Date();
        const targetDate = new Date();
        targetDate.setTime(timestamp);
        if (currentDate.getMonth() !== targetDate.getMonth()) return false;
        if (currentDate.getDate() !== targetDate.getDate()) return false;
        if (currentDate.getHours() - targetDate.getHours() > 4) return false;//有效期4个小时
        // if (currentDate.getMinutes() - targetDate.getMinutes() > 1)return false;
        return true;
    }


}
