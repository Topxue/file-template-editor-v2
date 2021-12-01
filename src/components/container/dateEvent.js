/** Created by xwp on 2021-11-30 **/

import 'layui-laydate/dist/theme/default/laydate.css';
import layDate from "layui-laydate";

import db from "@/utils/db";
import {PG_SELECT_DATE_ID} from "@/config/froala";

// 日期格式选择容器ID
const CHANGE_DATE_FORMAT = '#pg-change-date-format';

/**
 * 日期选择相关事件
 */
const dateEvent = {
  froala: null,
  /**
   * 初始化 日期选择
   * @param callback
   * @param format
   * @returns {*}
   */
  initDateSelected(callback, options) {
    return layDate?.render({
      elem: PG_SELECT_DATE_ID,
      format: 'yyyy-MM-dd',
      btns: ['clear'],
      theme: '#1e87f0',
      done: callback,
      ...options
    })
  },


  /**
   * 销毁日期实例
   */
  destroyDateInstance(formatValue) {
    const {$} = dateEvent.froala;
    let DATE_EL = $('[lay-key]');
    let key = DATE_EL.attr('lay-key');
    if (key) {
      $('#layui-laydate' + key).remove();
    }

    const nodeClone = DATE_EL.clone(true);
    DATE_EL.replaceWith(nodeClone.attr('value', formatValue));
  },

  /**
   * 日期事件处理
   */
  handleDateSelected() {
    dateEvent.froala = this.froala;

    const {$} = this.froala;
    const currentParameter = this.currentParameter, id = currentParameter.getAttribute('id');

    const updateAboutParameter = async (value) => {
      $(currentParameter).html(value);
      $(currentParameter).attr('data-shadow-value', value);

      await db.setItem(id, {defaultValue: value});
    }

    dateEvent.initDateSelected(updateAboutParameter)

    // 日期格式选择
    const dateChangeWrapper = $(CHANGE_DATE_FORMAT);
    const DATE_FORMAT_ENUM = {
      'yyyy-MM-dd': "$1-$2-$3",
      'yyyy/MM/dd': "$1/$2/$3",
      'yyyy年MM月dd日': '$1年$2月$3日'
    }

    dateChangeWrapper.on('change', async (event) => {
      const dateFormat = event.target.value;
      const dateWrapper = $(PG_SELECT_DATE_ID);

      if (dateWrapper.val()) {
        const formatValue = dateWrapper.val().replace(/(.+?)-(.+?)-(.+)/g, DATE_FORMAT_ENUM[dateFormat]);
        const cloneDateWrapper = $(dateWrapper).clone();
        cloneDateWrapper.attr('value', formatValue);
        $('#pg-default-wrapper').html(cloneDateWrapper);

        dateEvent.destroyDateInstance(formatValue);
        dateEvent.initDateSelected(updateAboutParameter, {
          format: dateFormat,
        })
        await db.setItem(id, {format: dateFormat});
      }
    }, false)

  },
}


export default dateEvent;
