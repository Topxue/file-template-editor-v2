/**
 * @description select 单选
 * @author PG
 * @createTime  2021-11-15
 */
export default (options) => {
  return options.reduce((prev, next) => {
    const {key, value} = next;

    return prev + `<label id=${key}"><input name="${key}" type="radio" value="${value}" placeholder="请输入选项名称" onclick="return false;"><span class="pg-radio-label">${value}</span></label>`
  }, '');
}
