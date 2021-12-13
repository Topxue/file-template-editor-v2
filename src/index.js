import './assets/styles/index.scss';
import '@/config/plugins';

import FroalaEditor from 'froala-editor';

import db from '@/utils/db';
import tableEvent from '@/components/table';
import table from "@/components/parameters/table";
import * as parameter from '@/components/parameters';
import bindEvent from '@/components/container/bindEvent';
import paneEvent from "@/components/paneparams/bindEvent";
import createContainer from './components/container/render';
import {FROALA_CONTAINER, froalaConfig, initiateConfig, SAVE_EDITOR_BTN} from "@/config/froala";

import {ObserveFroalaDom} from "@/utils/observe-dom";
import {
  getParameterName,
  insertParameterVerify,
  getUpdateParametersData,
  liveUpdateFroalaTemplate
} from "@/utils";
import initiateEvent from "@/components/container/initiateEvent";

class PgEditor {
  constructor(props) {
    this.props = {
      ...props,
    }
    this._init();
  }

  // 初始化
  _init() {
    // 初始化创建容器
    createContainer(this.props);
    // 初始化froala编辑器
    this.initFroalaEditor();

    // 初始化连接数据库
    db.initDB().then(res => {
      console.log(`%c 数据库 "${res?.name}" 初始化成功✔`, 'color:#0f0');
    });
  }

  // froala 初始化-制作模板
  async froalaInitialized() {
    const froala = this.froala;
    // 初始化光表位置
    froala?.events.focus();
    // 初始化DOM监听
    await ObserveFroalaDom(froala);
    // 初始化Table选择
    tableEvent.initEvent(froala);
    // 初始化froala内容模板
    await this.initFroalaTemplate();
    // 定时更新模板
    await liveUpdateFroalaTemplate(froala);
    // 初始化注册事件
    this.registerBindEvent();
  }

  //froala 初始化-发起事件处理
  async froalaInitiate() {
    this.froala.edit.off();
    await initiateEvent.init(this.froala);
  }

  // 初始化模板内容
  async initFroalaTemplate() {
    const res = await db.getItemTmp();
    if (res) {
      this.froala?.html.set(res.template);
      // 窗格参数渲染
      await paneEvent._init();
    }
  }

  // 初始化Froala-制作模板
  initFroalaEditor() {
    const _this = this;
    const makeEvents = {
      // 完成初始化时触发
      'initialized': async function () {
        await _this.froalaInitialized();
      },
      'table.inserted': async function (table) {
        const replaceTableHtml = tableEvent.replaceTableContent(table);
        this.html.insert(replaceTableHtml);
      },
      'click': async function (clickEvent) {
        await bindEvent._init(clickEvent, _this.froala);
      },
      'commands.redo': async function () {
        await paneEvent._init();
      },
      'commands.undo': async function () {
        await paneEvent._init();
      }
    }

    // 初始化Froala-发起
    const initiateEvents = {
      // 完成初始化时触发
      'initialized': async function () {
        await _this.froalaInitiate();
        // const froalaContainer = document.querySelector(FROALA_CONTAINER);
        // froalaContainer.querySelectorAll('[data-param-type]').forEach(element => {
        //   element.setAttribute('contenteditable', "true")
        //   element.addEventListener('input', (event) => {
        //     event.target.setAttribute('data-shadow-value', event.target.innerHTML)
        //     event.target.innerHTML
        //   })
        // });

        // console.log(froalaContainer.querySelectorAll('[data-param-type]'))
      }
    }

    const isViewer = _this.props?.isViewer;
    // 发起
    if (isViewer) {
      this.froala = new FroalaEditor(FROALA_CONTAINER, {...initiateConfig, events: initiateEvents})
      // 制作
    } else {
      this.froala = new FroalaEditor(FROALA_CONTAINER, {...froalaConfig, events: makeEvents})
    }
  }

  // 事件绑定
  registerBindEvent() {
    // 参数库事件绑定
    const parameterContainer = document.getElementById('parameter-container');
    parameterContainer.addEventListener('click', this.insetParameter.bind(this), false);

    // 保存
    const saveBtn = document.getElementById(SAVE_EDITOR_BTN);
    saveBtn.addEventListener('click', this.saveEditorContent.bind(this), false);
  }

  /**
   * 保存模板
   */
  async saveEditorContent() {
    const template = this.froala?.html.get().replace('is-active', '');

    await db.setItemTmp({template});
    await getUpdateParametersData();
  }

  // 插入参数库
  async insetParameter(event) {
    const verify = insertParameterVerify();
    if (!verify) {
      return UIkit?.notification({
        message: '参数内不允许插入参数',
        status: 'danger',
        timeout: 2500,
      })
    }
    const target = event.target, isDiv = target.tagName === 'DIV';
    const paramType = isDiv ? target.getAttribute('data-param-type') : target.parentNode.getAttribute('data-param-type');

    if (!paramType || paramType === 'table') return;

    const res = await db.addItem({paramType, name: getParameterName()});
    parameter[paramType] && this.froala?.html.insert(await parameter[paramType](res?.target.result), false);
  }
}

const FactoryOnlineEditor = (props) => {
  return new PgEditor(props)
}

/**
 * 参数设计:
 * *container: Dom容器
 * isViewer?: 是否显示为预览模式
 * showTools?: 是否显示工具栏  默认true
 */
FactoryOnlineEditor({
  isViewer: false,
  container: document.querySelector('#root')
})

export default FactoryOnlineEditor;
