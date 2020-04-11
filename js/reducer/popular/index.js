import Types from '../../action/types';

const defaultState = {};
/**
 *  popular:{
 *      java:{
 *          itmes:[],
 *          isLoading:false
 *      },
 *      ios:{
 *          itmes:[],
 *          isLoading:false
 *      }
 *  } //返回这种结构的state树
 *  0.state树,可以横向扩展
 *  1.如何动态设置store,和动态获取store(难点storeKey不固定);
 */
export default function onAction(state=defaultState, action) {
    switch (action.type) {
        case Types.LOAD_POPULAR_SUCCESS:
            return {
                ...state, // ES7:生成state副本
                [action.storeName]: {
                    ...[action.storeName],
                    items: action.items, // 做一个墨迹,老的会把新的覆盖掉
                    isLoading: false,
                }
            };
        case Types.POPULAR_REFRESH:
            return {
                ...state, // ES7:生成state副本
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: true,
                }
            };
        case Types.LOAD_POPULAR_FAIL:
            return {
                ...state, // ES7:生成state副本
                [action.storeName]: {
                    ...[action.storeName],
                    isLoading: false,
                }
            };
        default: state;
    }
    return state;
}
