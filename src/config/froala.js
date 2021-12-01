/** Created by xwp on 2021-11-11 **/

// froala-容器-ID
export const FROALA_CONTAINER = '#pg-froala-container';
// 参数库容器-ID
export const PARAMETERS_WRAPPER = '#pg-parameters-wrapper'
// 参数编辑容器-ID
export const PARAMETER_EDIT_WRAPPER = '#pg-parameter-edit-wrapper';
// 日期选择容器ID
export const PG_SELECT_DATE_ID = '#pg-select-date-wrapper';
// 单选&多选 标识符 class
export const PG_RADIO_AS_CHECKBOX = 'pg-radio-as-checkbox';

/**
 * froala 配置
 * @type {{language: string, toolbarButtons: string[], toolbarContainer: string, height: number}}
 */
export const froalaConfig = {
  height: 840,
  language: 'zh_cn',
  disabled: true,
  toolbarContainer: '#pg-toolbar-container',
  toolbarButtons: [
    'undo', 'redo', '|',
    'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', '|',
    'insertTable', 'insertImage', 'insertHR'
  ],
  // 删除时保留所选文本格式
  // keepFormatOnDelete: true,
  htmlAllowedEmptyTags: ['p', 'span', 'image'],
  // tableInsertMaxSize: 20,
  imageEditButtons: ['imageDisplay', 'imageRemove', '-', 'imageAlign', 'imageStyle', 'imageSize'],
  // tableCellMultipleStyles: false
}


/**
 * 参数库数据
 * @type {[{icon: string, label: string, type: string}, {icon: string, label: string, type: string}, {icon: string, label: string, type: string}, {icon: string, label: string, type: string}, {icon: string, label: string, type: string}, null, null]}
 */
export const PARAMETERS = [
  {
    label: '普通文本',
    icon: 'fa fa-text-width',
    type: 'text'
  },
  {
    label: '动态表格',
    icon: 'fa fa-table',
    type: 'table'
  },
  {
    label: '图片',
    icon: 'fa fa-image',
    type: 'image'
  },
  {
    label: '单选',
    icon: 'fa fa-check-circle',
    type: 'radio'
  },
  {
    label: '多选',
    icon: 'fa fa-check-square',
    type: 'checkbox'
  },
  {
    label: '日期',
    icon: 'fa fa-calendar',
    type: 'date'
  },
  {
    label: '身份证号',
    icon: 'fa fa-id-card',
    type: 'idcard'
  },
]

/**
 * 字体
 */
export const fontsList = [
  {
    fontName: '微软雅黑',
    font: 'Microsoft YaHei, STXihei, BASE'
  },
  {
    fontName: '宋体',
    font: 'SimSun, STSong, BASE'
  },
  {
    fontName: '黑体',
    font: 'SimHei, STHeiti, BASE'
  },
  {
    fontName: '仿宋',
    font: 'FangSong, STFangsong, BASE'
  },
  {
    fontName: '楷体',
    font: 'KaiTi, STKaiti, BASE'
  },
  {
    fontName: 'Arial',
    font: 'Arial'
  },
  {
    fontName: 'Georgia',
    font: 'Georgia'
  },
  {
    fontName: 'Impact',
    font: 'Impact'
  },
  {
    fontName: 'Tahoma',
    font: 'Tahoma'
  },
  {
    fontName: 'Times New Roman',
    font: 'Times New Roman'
  },
  {
    fontName: 'Verdana',
    font: 'Verdana'
  },
]
