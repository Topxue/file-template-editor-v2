/**
 * 下拉选-多选
 */
import '../select/index.scss';
import render from '@/components/selects/render';
import {$} from "@/utils/Dom";

const SELECT_DROP_WRAPPER = '#select-drop-multiple'
const IS_SELECTED = 'is-selected'

class $SelectorMultiple {
  constructor(ops = {}) {
    if (!ops?.elem) throw Error('请传入DOM selector!')

    this.options = {
      options: [],
      ...ops,
    }

    render(this.options)
    this._init()
    this.bindEvent()
  }

  _init() {
    this.visible = false
    this.currentSelect = null

    // 获取单选元素
    this.selectDoms = Dom.getElements(this.options.elem)
    // 下拉容器
    this.SELECT_DROP = Dom.getElem(SELECT_DROP_WRAPPER)
    // 获取下拉列表容器
    this.dropListWrapper = Dom.getElem('#pg-select-dropdown-list-multiple')
  }

  bindEvent() {
    this.bindEventSelect()
    this.bindEventSelectedMultiple()
    this.addEventLister()
  }

  // 全局事件注册
  addEventLister() {
    document.addEventListener('click', (event) => {
      const target = event.target
      const isSelect = $.attr(target, 'data-param-type') === 'selects'

      if (isSelect || $.class.has(target, 'select-item-multiple')) {
        this._selectDown()
      } else {
        this._selectDropUp()
      }
    })
  }

  // 下拉显示
  bindEventSelect() {
    this.$selects.forEach(element => {
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

  // 下拉选择-多选
  bindEventSelectedMultiple() {
    this.dropListWrapper.addEventListener('click', (event) => {
      const target = event.target;
      const isSelected = $.class.has(target, IS_SELECTED)
      isSelected ? $.class.remove(target, IS_SELECTED) : $.class.add(target, IS_SELECTED)

      const selectItems = [...this.dropListWrapper.children]
      const values = selectItems.map(node => $.class.has(node, IS_SELECTED) && $.attr(node, 'data-value')).filter(node => node)
      this.setValue(values.join())
    }, false)
  }

// 数据回显
  _selectDataEcho(target) {
    const lis = this.dropListWrapper.children;
    const values = target.value.split(',');

    [...lis].forEach(element => {
      values.includes($.attr(element, 'data-value')) ? $.class.add(element, IS_SELECTED) : $.class.remove(element, IS_SELECTED);
    })
  }

  // 设置当前参数值
  setValue(value) {
    $.attr(this.currentSelect, 'value', value)
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


export default $SelectorMultiple
