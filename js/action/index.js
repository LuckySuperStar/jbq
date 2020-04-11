// 在这里导出所有action
import {onThemeChange} from "./theme";
import {onLoadPopularData} from "./popular";

// 这里也把action做一个聚合,只要导入这个index就可以使用所有action
export default {
    onThemeChange,
    onLoadPopularData,
};
