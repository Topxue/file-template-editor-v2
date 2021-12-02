/** Created by xwp on 2021-11-18 **/
import db from '@/utils/db';
import {randomId} from "@/utils";
import * as TEMPLATE_ENUM from '@/template/inedx';
import view from "@/components/container/viewEvent";
import dateEvent from '@/components/container/dateEvent';
import replaceRadio from '@/components/parameters/radio';


// 参数库编辑容器
import {PARAMETER_EDIT_WRAPPER} from '@/config/froala'
import {optionSettingRender} from "@/template/render";

// 属性选择-class
const ACCORD_ATTR_INPUT = '.accord-attr-input';
//样式选择-class
const ACCORD_STYLE_INPUT = '.accord-style-input';
// 对齐方式选择器
const ALIGNMENT_WRAPPER = '.pg-alignment-wrapper';
// 选项设置容器-ID
const ADD_OPTION_BTN = '#pg-add-option';
const OPTION_WRAPPER = '#pg-option-setting-wrapper';
// 设置身份证默认值容器-ID
const SET_ID_CARD_ID = '#set-id-card-wrapper';


/**
 * 需要像素的属性集合
 * @type {string[]}
 */
const pixels = ['fontSize', 'width', 'height'];

export default {
  // 当前活动参数
  currentParameter: null,
  froala: null,
  async _init(event, froalaInstance) {
    this.froala = froalaInstance;
    await this.parameterEditEvent(event);
  },

  /**
   * 获取当前点击目标
   * @param event
   */
  getTarget(event) {
    let target = event.target;
    if (target.tagName === 'INPUT') {
      target = target.parentNode.parentNode;
    } else if (target.tagName === 'LABEL' || target.getAttribute('name') === 'person') {
      target = target.parentNode
    }

    return target
  },

  /**
   * 编辑区域事件代理
   * @param event
   */
  async parameterEditEvent(event) {
    const target = this.getTarget(event);
    const template = target.getAttribute('data-param-type') || '';
    // 当前点击是否为参数
    if (template) {
      this.currentParameter = target;
      await this._parameterEditEcho(template);
      this.addEventEditParameter(template);
      // 初始化选项设置-更改选项事件
      if (['radio', 'checkbox'].includes(template)) {
        this._changeOptionValueEvent();
      }
    }
    view.controlAccordion(!!template);
    view.activeParamSynced(target);
  },

  /**
   * 参数编辑数据回显,模板插入
   */
  async _parameterEditEcho(template) {
    const {$} = this.froala;
    const target = this.currentParameter;
    // 获取当前参数-数据
    const id = $(target).attr('id');
    const params = await db.getItem(id);
    const htmlTpl = TEMPLATE_ENUM[template] && TEMPLATE_ENUM[template]({params}) || '';

    $(PARAMETER_EDIT_WRAPPER).html(htmlTpl);
  },

  /**
   * 参数编辑事件注册
   */
  addEventEditParameter(template) {
    const parameterWrapper = document.querySelector(PARAMETER_EDIT_WRAPPER);
    // 根据属性设置
    const accordAttrDom = parameterWrapper.querySelectorAll(ACCORD_ATTR_INPUT);
    const accordStyleDom = parameterWrapper.querySelectorAll(ACCORD_STYLE_INPUT);
    const alignmentWrapper = parameterWrapper.querySelectorAll(ALIGNMENT_WRAPPER);


    // 注册change事件
    accordAttrDom.forEach(element => {
      element.addEventListener('change', this.handleInputChanged.bind(this));
    })

    accordStyleDom.forEach(element => {
      element.addEventListener('change', this.handleInputChangedStyle.bind(this));
    })

    // 对齐方式事件注册
    alignmentWrapper.forEach(element => {
      element.addEventListener('click', this.handleInputChangedStyle.bind(this));
    })

    if (template === 'idcard') {
      // 身份证默认值
      const SET_ID_CARD_W = document.querySelector(SET_ID_CARD_ID);
      SET_ID_CARD_W.addEventListener('keyup', this.handleIdCardDefaultVal.bind(this), false)
    }

    if (template === 'date') {
      dateEvent.handleDateSelected.apply(this)
    }

    // 选项设置-添加选项
    const addOptionBtn = document.querySelector(ADD_OPTION_BTN);
    if (addOptionBtn) {
      addOptionBtn.addEventListener('click', this._addOptionEvent.bind(this));
    }
  },

  /**
   * input changed
   * @param event
   */
  async handleInputChanged(event) {
    const {$} = this.froala;
    const target = event.target, attrName = target.name;
    const triggerEvent = this.changeParametersData(attrName, target.value);
    triggerEvent[attrName] && triggerEvent[attrName]();

    // 更新数据
    const id = $(this.currentParameter).attr('id');
    await db.setItem(id, {[attrName]: target.value})
  },

  /**
   * 通过属性更改样式
   * @param event
   */
  async handleInputChangedStyle(event) {
    const currentParameter = this.currentParameter;
    const id = currentParameter.getAttribute('id');
    const target = event.target, attrName = target.name;
    const value = target.value ? target.value : target.getAttribute('value');

    const isPixel = pixels.includes(attrName);
    currentParameter.style[attrName] = isPixel ? `${value}px` : value;

    if (attrName === 'size') {
      const toggleUsage = document.getElementById('toggle-usage');
      // 控制自定义宽高容器显示隐藏
      if (value === 'customize') {
        toggleUsage.removeAttribute('hidden');
      } else {
        toggleUsage.setAttribute('hidden', 'hidden');
      }
      view.setControlSize(currentParameter, this.froala.$, value);

      await db.setItem(id, {
        fontConfig: {
          size: [value, {
            width: 148,
            height: 17
          }],
        }
      })
      return;
    }

    if (attrName === 'width') {
      const res = await db.getItem(id);
      const fontConfig = res.fontConfig;
      const {height} = fontConfig.size[1];
      await db.setItem(id, {
        fontConfig: {
          size: ['customize', {
            width: value,
            height: height
          }],
        }
      })
      return;
    }

    if (attrName === 'height') {
      const res = await db.getItem(id);
      const fontConfig = res.fontConfig;
      const {width} = fontConfig.size[1];
      await db.setItem(id, {
        fontConfig: {
          size: ['customize', {
            width: width,
            height: value
          }],
        }
      })
      return;
    }

    // 更新数据
    await db.setItem(id, {
      fontConfig: {
        [attrName]: value,
      }
    })
  },

  /**
   * 设置身份证默认值
   */
  async handleIdCardDefaultVal(event) {
    const key = event.key;
    if (key !== 'Backspace' && key !== 'x' && key !== 'X' && !/^[0-9]*$/.test(key)) return;

    const idCards = [...this.currentParameter.children];
    const values = event.target.value.split('');

    if (values.length > 18) return;

    // 更新数据
    const id = this.currentParameter.getAttribute('id');
    await db.setItem(id, {
      defaultValue: values.join('')
    })

    if (key === 'Backspace') {
      idCards.forEach((element, index) => {
        const value = values[index] ? values[index] : '';
        element.innerHTML = value;
        element.setAttribute('data-shadow-value', value);
      })

      return;
    }

    values.forEach((value, index) => {
      idCards[index].innerHTML = value;
      idCards[index].setAttribute('data-shadow-value', value);
    })
  },

  /**
   * 修改当前参数属性&Value
   * @param attrName
   * @param value
   */
  changeParametersData(attrName, value) {
    const _this = this;
    const {$} = this.froala;
    const currentParameter = this.currentParameter;

    return {
      // 参数名称
      name() {
        $(currentParameter).attr('data-param-name', value);
      },
      // 默认值
      defaultValue() {
        $(currentParameter).text(value);
        $(currentParameter).attr('data-shadow-value', value);
      },
      // 外观
      style() {
        $(currentParameter).attr('data-border-type', value);
      },
      // 布局
      async layout() {
        $(currentParameter).attr('data-layout', value);
        await _this._changeSelectLayout(value);
      }
    }
  },

  /**
   * 切换选择布局
   * @param type
   * @private
   */
  async _changeSelectLayout(type) {
    if (type === 'dropdown') {
      this.currentParameter.innerHTML = '';
    } else {
      const dataId = this.currentParameter.getAttribute('id');
      const getRes = await db.getItem(dataId);
      this.currentParameter.innerHTML = replaceRadio(getRes.options);
    }
  },

  /**
   * 添加选项
   * @private
   */
  async _addOptionEvent() {
    const {$} = this.froala;
    const optionSetWrapper = document.querySelector(OPTION_WRAPPER);

    // 添加更新数据
    const key = randomId();
    const updateData = {...await this.getCurtParameterRes()};
    updateData.options.push({key, value: '请输入选项名称'});
    await db.setItem($(this.currentParameter).attr('id'), updateData);

    // 更新选择设置列表
    optionSetWrapper.innerHTML = optionSettingRender(updateData.options);
    // 更新替换富文本参数选项内容
    if ($(this.currentParameter).attr('data-layout') !== 'dropdown') {
      this.currentParameter.innerHTML = replaceRadio(updateData.options);
    }

    this._deleteOptionEvent();
    this._changeOptionValueEvent();
  },

  /**
   * 获取当前参数数据
   */
  async getCurtParameterRes() {
    const target = this.currentParameter;
    const dataId = target.getAttribute('id');

    return await db.getItem(dataId);
  },

  /**
   * 删除选项设置-item项
   * @private
   */
  _deleteOptionEvent() {
    const {$} = this.froala;
    const currentParameter = this.currentParameter;

    const deleteEvent = async (event) => {
      const deleteId = event.currentTarget.getAttribute('data-param-id');

      // 更新数据
      const updateData = {...await this.getCurtParameterRes()};
      updateData.options = updateData.options.filter(item => item.key !== deleteId);
      await db.setItem($(currentParameter).attr('id'), updateData);
      // 更新选项设置DOM
      const getRes = await this.getCurtParameterRes();
      $(OPTION_WRAPPER).html(optionSettingRender(getRes?.options));

      // 重新注册事件
      this._deleteOptionEvent();
      this._changeOptionValueEvent();

      // 更新富文本参数内容
      if ($(currentParameter).attr('data-layout') !== 'dropdown') {
        currentParameter.innerHTML = replaceRadio(updateData.options);
      }
    }

    const deleteBtn = Array.from($('.pg-delete-option-icon'));
    deleteBtn.forEach(element => element.addEventListener('click', deleteEvent, false));
  },

  /**
   * 注册修改选项事件
   * @private
   */
  _changeOptionValueEvent() {
    const {$} = this.froala;
    const inputs = Array.from($('.pg-change-option-val'));

    const changedValue = async (event) => {
      const target = event.target;
      const paramId = $(target).attr('name');
      // 更新数据
      const updateData = {...await this.getCurtParameterRes()};
      const targetOps = updateData.options.find(item => item.key === paramId);
      targetOps.value = target.value;
      await db.setItem(paramId, updateData);

      // 更新选项设置DOM
      if ($(this.currentParameter).attr('data-layout') !== 'dropdown') {
        const getRes = await this.getCurtParameterRes();
        this.currentParameter.innerHTML = replaceRadio(getRes?.options);
      }
    }

    inputs.forEach(element => element.addEventListener('input', changedValue, false));
  },
}
