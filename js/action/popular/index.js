// 在这里导出所有action
import Types from '../types';
import DataStore from "../../expand/dao/DataStore";

// 获取最热数据的异步action
export function onLoadPopularData(storeName, url) {
    // 不能用同步action,需要异步action
    return dispatch => {
        dispatch({type: Types.POPULAR_REFRESH, storeName: storeName});
        let dataStore = new DataStore();
        dataStore.fetchData(url) // 异步action与数据流
            .then(data => {
                handleData(dispatch, storeName, data)
            })
            .catch(error => {
                console.log(error);
                dispatch({
                    type: Types.LOAD_POPULAR_FAIL,
                    storeName,
                    error
                })
            });
    }
}

function handleData(dispatch, storeName, data) {
    dispatch({
        type: Types.LOAD_POPULAR_SUCCESS,
        itmes: data&&data.data&&data.data.items,
        storeName,
    })
}
