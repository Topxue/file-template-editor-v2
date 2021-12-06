import './assets/styles/index.scss';
import '@/config/plugins';

import FroalaEditor from 'froala-editor';

import db from '@/utils/db';
import {$} from "@/utils/Dom";
import tableEvent from '@/components/table';
import * as parameter from '@/components/parameters';
import table from "@/components/parameters/table";
import bindEvent from '@/components/container/bindEvent';
import createContainer from './components/container/render';
import {FROALA_CONTAINER, froalaConfig} from "@/config/froala";

import {ObserveFroalaDom} from "@/utils/observe-dom";
import {getParameterName, insertParameterVerify, liveUpdateFroalaTemplate} from "@/utils";
import paneEvent from "@/components/paneparams/bindEvent";

class PgEditor {
  constructor(props) {
    this.props = {
      ...props,
    }
    this._init();
  }

  // 初始化
  _init() {
    createContainer(this.props);
    this.initFroalaEditor();
    this.registerBindEvent();
    // 初始化连接数据库
    db.initDB().then(res => {
      console.log(`%c 数据库 "${res?.name}" 初始化成功✔`, 'color:#0f0');
    });
  }

  // froala 初始化完成
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
    await liveUpdateFroalaTemplate(froala);
  }

  async initFroalaTemplate() {
    const res = await db.getItemTmp();
    if (res) {
      this.froala?.html.set(res.template);
      // 窗格参数渲染
      await paneEvent._init();
    }
  }

  // 初始化Froala
  initFroalaEditor() {
    const _this = this;
    this.froala = new FroalaEditor(FROALA_CONTAINER, {
      ...froalaConfig,
      events: {
        // 完成初始化时触发
        'initialized': async function () {
          // 编辑制作模板
          if (!_this.props?.isViewer) {
            await _this.froalaInitialized();
          }
          // if (_this.props?.isViewer) {
          //   this.edit.off()
          // }
        },
        'table.inserted': async function (table) {
          const replaceTableHtml = tableEvent.replaceTableContent(table);
          this.html.insert(replaceTableHtml);
        },
        'click': async function (clickEvent) {
          await bindEvent._init(clickEvent, _this.froala);
        }
      }
    })
  }

  // 事件绑定
  registerBindEvent() {
    // 参数库事件绑定
    const parameterContainer = $.getElem('#parameter-container');
    parameterContainer.addEventListener('click', this.insetParameter.bind(this), false)
    // 测试
    // $.getElem('#get-data-btn').addEventListener('click', () => {
    //   console.log(this.froala?.html.get(), 'testData...')
    // }, false)
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
