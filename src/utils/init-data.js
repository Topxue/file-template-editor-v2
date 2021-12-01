/** Created by xwp on 2021-11-29 **/
export default {
  'text': {
    name: '参数',
    paramType: 'text',
    isRequired: true,
    style: 'bottom',
    layout: 'dropdown',
    defaultValue: '',
    options: [],
    description: '',
    fontConfig: {
      fontFamily: '',
      fontSize: null,
      fontWeight: 'inherit',
      justifyContent: 'flex-start',
      size: ['fixed', {
        width: 148,
        height: 17
      }],
      color: null,
    },
    maxLength: 1000,
    columnKeys: [],
  },
  'radio': {
    name: '参数',
    paramType: 'radio',
    isRequired: true,
    style: 'all',
    layout: 'dropdown',
    defaultValue: '',
    options: [{
      key: 'param_no_delete',
      value: '请输入选项名称'
    }],
    description: '',
    fontConfig: {
      fontFamily: '',
      fontSize: null,
      fontWeight: 'inherit',
      justifyContent: 'flex-start',
      size: ['fixed', {
        width: 148,
        height: 17
      }],
      color: null,
    },
    maxLength: 1000,
    columnKeys: [],
  },
  'checkbox': {
    name: '参数',
    paramType: 'radio',
    isRequired: true,
    style: 'all',
    layout: 'dropdown',
    defaultValue: '',
    options: [{
      key: 'param_no_delete',
      value: '请输入选项名称'
    }],
    description: '',
    fontConfig: {
      fontFamily: '',
      fontSize: null,
      fontWeight: 'inherit',
      justifyContent: 'flex-start',
      size: ['fixed', {
        width: 148,
        height: 17
      }],
      color: null,
    },
    maxLength: 1000,
    columnKeys: [],
  },
  'image': {
    name: '参数',
    paramType: 'image',
    description: '',
    isRequired: true,
  },
  'date': {
    name: '参数',
    paramType: 'date',
    format: 'yyyy-MM-dd',
    isRequired: true,
    style: 'bottom',
    layout: 'dropdown',
    defaultValue: '',
    options: [],
    description: '',
    fontConfig: {
      fontFamily: '',
      fontSize: null,
      fontWeight: 'inherit',
      justifyContent: 'flex-start',
      size: ['fixed', {
        width: 148,
        height: 17
      }],
      color: null,
    },
    maxLength: 1000,
    columnKeys: [],
  },
  'idcard': {
    name: '参数',
    paramType: 'idcard',
    isRequired: true,
    style: 'bottom',
    layout: 'dropdown',
    defaultValue: '',
    options: [],
    description: '',
    fontConfig: {
      fontFamily: '',
      fontSize: null,
      fontWeight: 'inherit',
      justifyContent: 'flex-start',
      size: ['fixed', {
        width: 148,
        height: 17
      }],
      color: null,
    },
    maxLength: 1000,
    columnKeys: [],
  },
}
