/** Created by xwp on 2021-11-11 **/
// froala-容器-ID
export const FROALA_CONTAINER = '#pg-froala-container';
// 窗格参数容器
export const PG_PANE_PARAMS = '#pg-html-panel-params';
// 参数库容器-ID
export const PARAMETERS_WRAPPER = '#pg-parameters-wrapper'
// 参数编辑容器-ID
export const PARAMETER_EDIT_WRAPPER = '#pg-parameter-edit-wrapper';
// 日期选择容器ID
export const PG_SELECT_DATE_ID = '#pg-select-date-wrapper';
// 参数库-Table渲染容器ID
export const TABLE_SELECTOR_WRAPPER = 'pg-table-selector-wrapper';
// 保存ID
export const SAVE_EDITOR_BTN = 'pg-save-editor-content';

/**
 * froala 制作配置
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
  tableEditButtons: ['tableRemove', '|', 'tableRows', 'tableColumns', 'tableStyle', '-', 'tableCells', 'tableCellBackground', 'tableCellVerticalAlign', 'tableCellHorizontalAlign'],
  // 删除时保留所选文本格式
  // keepFormatOnDelete: true,
  htmlAllowedEmptyTags: ['p', 'span', 'image'],
  imageEditButtons: ['imageDisplay', 'imageRemove', '-', 'imageAlign', 'imageStyle', 'imageSize'],
}

/**
 * froala 发起配置
 */
export const initiateConfig = {
  height: 840,
  language: 'zh_cn',
  toolbarContainer: '#pg-toolbar-container',
  htmlAllowedEmptyTags: ['p', 'span', 'image'],
  tableEditButtons: ['tableRows'],
  imageEditButtons: ['imageDisplay', 'imageRemove', '-', 'imageAlign', 'imageStyle', 'imageSize'],
}

/**
 * icon 映射
 */
export const ICON_ENUM = {
  'text': 'fa fa-text-width',
  'table': 'fa fa-table',
  'image': 'fa fa-image',
  'radio': 'fa fa-check-circle',
  'checkbox': 'fa fa-check-square',
  'date': 'fa fa-calendar',
  'idcard': 'fa fa-id-card'
}

/**
 * 参数库数据
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
