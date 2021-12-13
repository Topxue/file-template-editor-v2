/** Created by xwp on 2021-12-07 **/
import db from "@/utils/db";
import {FROALA_CONTAINER, ICON_ENUM} from "@/config/froala";
import $Selector from '@/components/select';
import {getFroalaContentParams, getUpdateParametersData} from "@/utils";

const initiateEvent = {
  froala: null,
  parameters: [],
  // 参数填写容器
  fillInContainer: null,
  froalaContainer: null,
  async init(froala) {
    this.froala = froala;

    await this.getFileTemplateContent();
    await this.renderParameter();
    await this.bingEvent();
  },

  /**
   * 获取模板内容html
   */
  async getFileTemplateContent() {
    const res = await db.getItemTmp();
    this.froala?.html.set(res.template);
  },

  /**
   * 参数填写 模板映射
   */
  paramTempEnum() {
    return {
      'text': (param) => `
        <div class="uk-margin-small-bottom" data-html-id="${param.id}">
           <label class="uk-form-label ${param.isRequired ? 'is-required' : ''}">${param.name}</label>
           <div class="uk-form-controls uk-inline uk-width-1-1">
             <i class="uk-form-icon ${ICON_ENUM[param.paramType]}"></i>
             <input class="uk-input uk-form-small uk-text-emphasis" type="text" name="${param.paramType}" value="${param?.defaultValue || ''}" placeholder="请输入">
           </div>
        </div>
      `,
      'image': (param) => `
         <div class="uk-margin-small-bottom" data-html-id="${param.id}">
           <label class="uk-form-label ${param.isRequired ? 'is-required' : ''}">${param.name}</label>
           <div class="uk-form-controls uk-inline uk-width-1-1">
             <div uk-form-custom class="uk-width-1-1">
              <input type="file">
              <button class="uk-button uk-button-small uk-button-default uk-width-1-1" type="button" tabindex="-1">点击上传</button>
             </div>
           </div>
        </div>
      `,
      'radio': (param) => {
        const {layout, options} = param;
        const isDropdown = layout === 'dropdown';

        return `
          <div class="uk-margin-small-bottom" data-html-id="${param.id}">
           <label class="uk-form-label ${param.isRequired ? 'is-required' : ''}">${param.name}</label>
           <div class="uk-form-controls uk-inline uk-width-1-1">
              ${isDropdown ? `
                <div>
                <i class="uk-form-icon ${ICON_ENUM[param.paramType]}"></i>
                  <input data-select-id="${param.id}" class="uk-input uk-form-small uk-text-emphasis" type="text" name="name" readonly  placeholder="请选择">
                </div>
              ` : `${options.reduce((prev, next) => prev + `<label class="uk-margin-small-right"><input class="uk-radio" type="radio" name="${param.id}"> ${next.value}</label>`, '')}`}
           </div>
          </div>
        `
      },
      'table': (param) => `
        <div class="uk-margin-small-bottom" data-html-id="${param.id}">
           <label class="uk-form-label ${param.isRequired ? 'is-required' : ''}">${param.name}</label>
           <div class="uk-form-controls uk-inline uk-width-1-1">
             <div class="uk-text-muted trip-text">请在正文中填写</div>
           </div>
        </div>
      `,
      'idcard': (param) => `
        <div class="uk-margin-small-bottom" data-html-id="${param.id}">
           <label class="uk-form-label ${param.isRequired ? 'is-required' : ''}">${param.name}</label>
           <div class="uk-form-controls uk-inline uk-width-1-1">
             <i class="uk-form-icon ${ICON_ENUM[param.paramType]}"></i>
             <input class="uk-input uk-form-small uk-text-emphasis" type="text" maxlength="18" name="idcard" value="${param?.defaultValue || ''}" placeholder="请输入">
           </div>
        </div>
      `,
    }
  },
//
// <div uk-dropdown="mode:click;pos: bottom-justify">
//   <ul className="uk-nav uk-dropdown-nav pg-dropdown-container">
//     ${options.reduce((prev, next) => prev + `<li><a href="#">${next.value}</a></li>`, '')}
//   </ul>
// </div>

  /**
   * 渲染参数填写内容
   */
  async renderParameter() {
    const FILL_IN_PARAMETER_WRAPPER = document.getElementById('fill-in-parameter-container'),
      badgeWrapper = document.getElementById('parameter-count-badge');

    const paramTempEnum = this.paramTempEnum();
    const data = await getUpdateParametersData();
    badgeWrapper.innerHTML = data?.length || '0';

    const getFillInParamContent = () => {
      return data.reduce((prev, next) => {
        const temp = paramTempEnum[next.paramType] ? paramTempEnum[next.paramType](next) : '';

        return prev + temp;
      }, '')
    }

    FILL_IN_PARAMETER_WRAPPER.innerHTML = await getFillInParamContent();
  },

  /**
   * 参数点击
   */
  parameterClickEvent(event) {
    const target = event.target;

    this.currentActiveParameter(target)
  },

  /**
   * 当前活动参数
   */
  currentActiveParameter(target) {
    const isCard = target?.getAttribute('name') === 'person';
    if (isCard) {
      target = target.parentNode;
    }
    if (['td', 'th'].includes((target.tagName).toLocaleLowerCase())) {
      target = target.closest('.pg-table-container');
    }

    const siblings = Array.from(this.parameters).filter(n => n !== target).filter(element => element);
    if (target?.getAttribute('data-param-type')) {
      target.classList.add('is-active');
    }

    if (siblings?.length) {
      siblings.forEach(element => element.classList.remove('is-active'));
    }

    const htmlId = target.getAttribute('id');

    this.focusFillInParameter(htmlId)
  },

  /**
   * 聚焦参数填写
   */
  focusFillInParameter(htmlId) {
    const goalDom = this.fillInContainer.querySelector(`[data-html-id="${htmlId}"]`);

    const setActive = () => {
      const siblings = Array.from(this.fillInContainer.children).filter(n => n !== goalDom).filter(element => element);
      siblings.forEach(element => {
        const label = element.querySelector('label');
        label.style.color = '#333'
      });
    }

    const label = goalDom?.querySelector('label');
    if (label) label.style.color = '#2489f2';

    setActive();
  },

  /**
   * 参数编辑
   * @param event
   */
  parameterChangeEvent(event) {
    const target = event.target, value = target?.innerHTML || target.value;
    target.setAttribute('data-shadow-value', value || '');
    const htmlId = target.getAttribute('id');

    const fillInTarget = this.fillInContainer.querySelector(`[data-html-id="${htmlId}"]`);
    const input = fillInTarget.querySelector('input');
    input.value = value || '';
  },

  /**
   * 参数填写事件映射
   */
  fillInChangeEventEnum() {
    const _this = this;
    return {
      'text': function (htmlId, value) {
        const editorParam = _this.froalaContainer.querySelector(`[id="${htmlId}"]`);
        editorParam.innerHTML = value || '';
        editorParam.setAttribute('data-shadow-value', value || '');
      }
    }
  },
  /**
   * 参数填写change event
   */
  fillInChangeEvent(event) {
    const target = event.target;
    const htmlId = target.closest('[data-html-id]').getAttribute('data-html-id');

    const paramType = target.getAttribute('name');
    const eventEnum = this.fillInChangeEventEnum();

    eventEnum[paramType] && eventEnum[paramType](htmlId, target.value);
  },


  /**
   * 身份证输入事件
   */
  fillInKeyupEvent(event) {
    const key = event.key;
    if (key !== 'Backspace' && key !== 'x' && key !== 'X' && !/^[0-9]*$/.test(key)) return;
    const target = event.target;
    const htmlId = target.closest('[data-html-id]').getAttribute('data-html-id');

    const editorParam = this.froalaContainer.querySelector(`[id="${htmlId}"]`);
    const idCards = [...editorParam.children];

    const values = event.target.value.split('');
    if (values.length > 18) return;
    // 更新数据
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
   * 编辑器-身份证参数
   */
  parameterIdCardKeyupEvent(event) {
    const key = event.key;
    if (key !== 'Backspace' && key !== 'x' && key !== 'X' && !/^[0-9]*$/.test(key)) return;
    const target = event.target;

    const setFilInInValue = () => {
      const htmlId = event.target.parentNode.getAttribute('id');
      const fillInTarget = this.fillInContainer.querySelector(`[data-html-id="${htmlId}"]`);
      const input = fillInTarget.querySelector('input');
      input.value = [...target.parentNode.childNodes].reduce((prev, next) => {
        return prev + next.innerHTML;
      }, '') || '';
    }

    setTimeout(() => {
      if (key === 'Backspace') {
        if (target.previousSibling) {
          target.previousSibling.focus();
          target.innerHTML = '';
          target.setAttribute('data-shadow-value', '');
        } else {
          target.innerHTML = '';
          target.setAttribute('data-shadow-value', '');
        }
        setFilInInValue();
        return;
      }

      if (target.innerHTML.length > 1) {
        target.innerHTML = target.innerHTML[0]
      }

      target.setAttribute('data-shadow-value', target.innerHTML);
      if (target.nextElementSibling) {
        target.nextElementSibling.focus();
      } else {
        target.blur()
      }
      setFilInInValue();
    }, 0)
  },

  /**
   * 注册参数事件
   */
  bingEvent() {
    this.parameters = getFroalaContentParams();
    this.fillInContainer = document.querySelector('#fill-in-parameter-container');

    // 编辑区域点击
    this.froalaContainer = document.querySelector(FROALA_CONTAINER);
    this.froalaContainer.addEventListener('click', this.parameterClickEvent.bind(this), false);

    // 参数事件注册
    this.parameters.forEach(node => {
      const paramType = node.getAttribute('data-param-type');
      if (paramType === 'text') {
        // 设置可编辑
        node.setAttribute('contenteditable', true);
        node.addEventListener('input', this.parameterChangeEvent.bind(this), false)
      } else if (paramType === 'idcard') {
        ;[...node.children].forEach(element => {
          element.setAttribute('contenteditable', true);
          element.addEventListener('keydown', this.parameterIdCardKeyupEvent.bind(this), false);
        });
      }
    });

    // 图片事件初始化
    const imageTarget = this.parameters.filter(item => item.getAttribute('data-param-type') === 'image');
    imageTarget.forEach(node => node.addEventListener('click', this.parameterClickEvent.bind(this), false));

    // 聚焦参数事件初始化
    const regEventEnum = {
      'text': (node) => node.addEventListener('input', this.fillInChangeEvent.bind(this), false),
      'idcard': (node) => node.addEventListener('keyup', this.fillInKeyupEvent.bind(this), false),
    };
    ;[...this.fillInContainer.children].forEach(node => {
      const inputT = node.querySelector('input');
      const paramType = inputT?.getAttribute('name');

      node.addEventListener('click', (event) => {
        const htmlId = event.currentTarget.getAttribute('data-html-id');
        const parameter = this.parameters.find(node => node.getAttribute('id') === htmlId);

        this.currentActiveParameter(parameter);
      })

      regEventEnum[paramType] && regEventEnum[paramType](node);
    })

    // const selectArray = parameters.filter(element => element.getAttribute('data-param-type') === 'radio');
    // selectArray.forEach(async (node) => {
    //   const id = node.getAttribute('id');
    //   const res = await db.getItem(id);
    //
    //   if(res.layout === 'dropdown') {
    //     new $Selector({
    //       elem: `[data-select-id="${res.id}"]`,
    //       options: res.options
    //     })
    //   }
    //
    //   console.log(res)
    // })
  },
}

export default initiateEvent;
