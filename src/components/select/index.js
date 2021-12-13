/**
 * 下拉选择-单选
 */
import './index.scss';

import {$} from "@/utils/Dom";
import render from "@/components/select/render";

const SELECT_DROP_WRAPPER = '#select-drop'
const IS_SELECTED = 'is-selected'

class $Selector {
  constructor(ops = {}) {
    if (!ops?.elem) throw Error('请传入$ selector!')
    this.options = {
      options: [],
      ...ops,
    }

    render(this.options)
    this._init(this.options)
    this.bindEvent()
  }

  _init() {
    // 获取下拉列表容器
    this.dropListWrapper = $.getElem('#pg-select-dropdown-list');
  }

  bindEvent() {
    this.bindEventSelected()
  }


  // 下拉选择-单选
  bindEventSelected() {
    const selectedEvent = (event) => {
      const target = event.target;

      if ($.class.has(target, IS_SELECTED)) {
        $.class.remove(target, IS_SELECTED)
        this.setValue('')
      } else {
        $.class.add(target, IS_SELECTED)
        $.siblings(target).forEach(element => $.class.remove(element, IS_SELECTED))
        this.setValue($.attr(target, 'data-value'))
      }
    }

    [...this.dropListWrapper.children].forEach(node => node.addEventListener('click', selectedEvent, false));
  }

  // 设置当前参数值
  setValue(value) {
    const target = document.querySelector(this.options.elem);
    target.setAttribute('value', value);
  }

  // 数据回显
  _selectDataEcho(target) {
    const lis = this.dropListWrapper.children;
    ;[...lis].forEach(element => {
      $.attr(element, 'data-value') === target.value ? $.class.add(element, IS_SELECTED) : $.class.remove(element, IS_SELECTED);
    })
  }

}

export default $Selector
