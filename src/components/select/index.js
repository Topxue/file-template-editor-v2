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

    this.visible = false
    this.currentSelect = null

    render(this.options)
    this._init(this.options)
    this.bindEvent()
  }

  _init() {
    // 获取单选元素
    this.select$s = $.getElements(this.options.elem)
    // 下拉容器
    this.SELECT_DROP = $.getElem(SELECT_DROP_WRAPPER)
    // 获取下拉列表容器
    this.dropListWrapper = $.getElem('#pg-select-dropdown-list')
  }

  bindEvent() {
    this.bindEventSelect()
    this.bindEventSelected()
    this.addEventLister()
  }

  // 全局事件注册
  addEventLister() {
    document.addEventListener('click', (event) => {
      const target = event.target
      const isSelect = $.attr(target, 'data-param-type') === 'select'
      isSelect ? this._selectDown() : this._selectDropUp()
    })
  }

  // 下拉显示
  bindEventSelect() {
    this.select$s.forEach(element => {
      element.addEventListener('click', (event) => {
        const {left, top} = element.getBoundingClientRect()

        this.currentSelect = event.target
        // 数据回显
        this._selectDataEcho(event.target)

        this.visible ? this._selectDropUp() : this._selectDown()

        const scrollLeft = document.documentElement.scrollLeft, scrollTop = document.documentElement.scrollTop;
        this.SELECT_DROP.style.left = left + scrollLeft + 'px'
        this.SELECT_DROP.style.top = top + scrollTop + 25 + 'px'
      }, false)
    })
  }

  // 下拉选择-单选
  bindEventSelected() {
    this.dropListWrapper.addEventListener('click', (event) => {
      const target = event.target;

      if ($.class.has(target, IS_SELECTED)) {
        $.class.remove(target, IS_SELECTED)
        this.setValue('')
      } else {
        $.class.add(target, IS_SELECTED)
        $.siblings(target).forEach(element => $.class.remove(element, IS_SELECTED))
        this.setValue($.attr(target, 'data-value'))
      }

      this._selectDropUp()
    }, false)
  }

  // 设置当前参数值
  setValue(value) {
    $.attr(this.currentSelect, 'value', value)
  }

  // 数据回显
  _selectDataEcho(target) {
    const lis = this.dropListWrapper.children;

    ;[...lis].forEach(element => {
      $.attr(element, 'data-value') === target.value ? $.class.add(element, IS_SELECTED) : $.class.remove(element, IS_SELECTED);
    })
  }

  // 展开下拉
  _selectDown() {
    this.SELECT_DROP.style.display = 'block'
    this.SELECT_DROP.style.transform = 'scale(1,1)'
    this.SELECT_DROP.style.opacity = '1'
    this.visible = true
  }

//  收起下拉
  _selectDropUp() {
    this.SELECT_DROP.style.display = 'none'
    this.SELECT_DROP.style.transform = 'scale(1,0)'
    this.SELECT_DROP.style.opacity = '0'
    this.visible = false
  }


}

export default $Selector
