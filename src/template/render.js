/** Created by xwp on 2021-11-18 **/

import {fontsList} from '@/config/froala';

/**
 * 外观-文本
 * @param params
 */
const reduceExteriors = (options, params) => {
  return options.reduce((prev, next, index) => {
    const isChecked = next.value === params.style || next.value === 'bottom';
    const marginClass = index > 0 ? 'uk-margin-small-left' : void 0;

    const option = isChecked ?
      `<label class="${marginClass}"><input class="uk-radio accord-attr-input" type="radio" value="${next.value}" name="style" checked><span class="uk-margin-small-left">${next.label}</span></label>`
      : `<label class="${marginClass}"><input class="uk-radio accord-attr-input" type="radio" value="${next.value}" name="style"><span class="uk-margin-small-left">${next.label}</span></label>`;

    return prev + option;
  }, '');
}

export const borderExteriors = (params) => {
  const options = [
    {value: 'bottom', label: '下划线'},
    {value: 'all', label: '边框'},
    {value: 'none', label: '无边框'}
  ];

  return reduceExteriors(options, params);
}

/**
 * 外观-单选-多选
 * @param params
 */
export const borderExteriorsForCheckbox = (params) => {
  const options = [
    {value: 'bottom', label: '下划线样式'},
    {value: 'all', label: '标准样式'}
  ];

  return reduceExteriors(options, params);
}


/**
 * 控件大小
 * @param params
 */
export const controlSizeOptions = (params) => {
  const options = [
    {value: 'auto', label: '根据填写内容自动变化'},
    {value: 'fixed', label: '固定大小(默认)'},
    {value: 'customize', label: '固定大小(自定义)'},
  ];

  // 当前参数是否为日期参数
  const isDateParamType = params.paramType === 'date';
  if (isDateParamType) {
    options.splice(0, 1);
  }

  return options.reduce((prev, next, index) => {
    const isChecked = next.value === params.fontConfig.size[0];

    const option = isChecked ?
      `<label><input class="uk-radio accord-style-input" type="radio" value="${next.value}" name="size" checked><span class="uk-margin-small-left">${next.label}</span></label><br/>`
      : `<label><input class="uk-radio accord-style-input" type="radio" value="${next.value}" name="size"><span class="uk-margin-small-left">${next.label}</span></label><br/>`;

    return prev + option;
  }, '');
}


/**
 * 字体模板
 * @returns {string}
 */
export const fontFamilyOptions = (params) => {
  return fontsList.reduce((prev, next) => {
    const selected = next.font.trim() === params.fontConfig.fontFamily;
    const option = selected ? `<option value="${next.font.trim()}" style="font-family: ${next.font}" selected>${next.fontName}</option>` : `<option value="${next.font.trim()}" style="font-family: ${next.font}">${next.fontName}</option>`;

    return prev + option;
  }, '');
}

/**
 * 字体大小模板
 * @returns {any}
 */
export const fontSizeOptions = (params) => {
  const fontSize = params.fontConfig.fontSize || 0;

  const LEN = 16;
  return new Array(LEN).fill(12).map((prev, index) => {
    return prev + (index < 10 ? index * 2 : index * 6 - 6);
  }, 12).reduce((prev, next) => {
    const isSelected = next === Number(fontSize);
    const option = isSelected ? `<option value="${next}" selected>${next}</option>` : `<option value="${next}">${next}</option>`;

    return prev + option;
  }, '');
}

/**
 * 字体粗细
 * @param params
 * @returns {string}
 */
export const fontWeightOptions = (params) => {
  const options = [
    {value: 'inherit', label: '默认'},
    {value: 'bold', label: '加粗'},
    {value: 'normal', label: '不加粗'}
  ];

  return options.reduce((prev, next) => {
    const isSelected = next.value === params.fontConfig.fontWeight;
    const option = isSelected ? `<option value="${next.value}" selected>${next.label}</option>` : `<option value="${next.value}">${next.label}</option>`;

    return prev + option;
  }, '');
}

/**
 * 对齐方式
 * @param params
 * @returns {string}
 */
export const alignmentList = (params) => {
  const list = [
    {value: 'flex-start', label: '左对齐'},
    {value: 'center', label: '居中'},
    {value: 'flex-end', label: '右对齐'}
  ];

  return list.reduce((prev, next) => {
    const isActive = next.value === params.fontConfig.justifyContent ? 'uk-active' : '';

    return prev + `<li class="${isActive}"><a href="#" class="pg-alignment-wrapper" name="justifyContent" value="${next.value}">${next.label}</a></li>`;
  }, '');
}

/**
 * 布局方式
 * @param params
 */
export const layoutTypeOptions = (params) => {
  const options = [
    {value: 'dropdown', label: '下拉菜单'},
    {value: 'horizontal', label: '横向排列'},
    {value: 'vertical', label: '纵向排列'}
  ];

  return options.reduce((prev, next) => {
    const isSelected = next.value === params.layout;

    const option = isSelected ? `<option value="${next.value}" selected>${next.label}</option>` : `<option value="${next.value}">${next.label}</option>`;

    return prev + option;
  }, '');
}

/**
 * 选项设置-渲染
 * @param options
 */
export const optionSettingRender = (options) => {
  return options.reduce((prev, next, index) => {
    const {key, value} = next;
    return prev + `
         <div data-id="${key}" class="uk-flex">
           <input class="uk-input uk-form-small uk-margin-small-bottom pg-change-option-val" type="text" name="${key}" value="${value}" placeholder="请输入选项名称"/>
           ${index > 0 ? `<a href="#" class="uk-icon-link uk-margin-small-top5 pg-delete-option-icon" uk-icon="trash" data-param-id="${key}"></a>` : ''}
         </div>
     `
  }, '');
}

/**
 * 日期格式-渲染
 * @param params
 * @returns {string}
 */
export const dateFormatOptionsRender = (params) => {
  const options = [
    {value: 'yyyy-MM-dd', label: 'yyyy-MM-dd'},
    {value: 'yyyy/MM/dd', label: 'yyyy/MM/dd'},
    {value: 'yyyy年MM月dd日', label: 'yyyy年MM月dd日'}
  ];
  return options.reduce((prev, next) => {
    const isSelected = next.value === params.format;
    const option = isSelected ? `<option value="${next.value}" selected>${next.label}</option>` : `<option value="${next.value}">${next.label}</option>`;
    return prev + option;
  }, '');
}

