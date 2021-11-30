import './assets/styles/index.scss';
import '@/config/plugins';

import db from '@/utils/db';
import {$} from "@/utils/Dom";
import FroalaEditor from 'froala-editor';
import bindEvent from '@/components/container/bindEvent';
import {FROALA_CONTAINER, froalaConfig} from "@/config/froala";

import * as parameter from './components/parameters';
import {ObserveFroalaDom} from "@/utils/observe-dom";
import createContainer from './components/container/render';

class PgEditor {
  constructor(props) {
    this.props = {
      ...props,
    }
    this._init();
  }

  // 初始化
   _init() {
    // 初始化连接数据库
    db.initDB();
    createContainer(this.props);
    this.initFroalaEditor();
    this.registerBindEvent();

  }

  // 初始化Froala
  initFroalaEditor() {
    const _this = this;
    this.froala = new FroalaEditor(FROALA_CONTAINER, {
      ...froalaConfig,
      events: {
        // 完成初始化时触发
        'initialized': async function () {
          if (_this.props?.isViewer) {
            this.edit.off()
          }
          await ObserveFroalaDom(_this.froala);
        },
        'click': async function (clickEvent) {
          await bindEvent._init(clickEvent, _this.froala)
        }
      }
    })
  }

  // 事件绑定
  registerBindEvent() {
    // 参数库事件绑定
    const parameterContainer = $.getElem('#parameter-container');
    parameterContainer.addEventListener('click', this.insetParameter.bind(this), false)
    // // 测试
    // $.getElem('#get-data-btn').addEventListener('click', () => {
    //   console.log(this.froala?.html.get(), 'testData...')
    // }, false)
  }

  // 插入参数库
  async insetParameter(event) {
    const target = event.target
    const isDiv = target.tagName === 'DIV'
    const paramType = isDiv ? target.getAttribute('data-param-type') : target.parentNode.getAttribute('data-param-type');

    // if (paramType === 'table') {
    //   this.froala?.table.getTablepopups(event)
    //   return
    // }

    const res = await db.addItem({paramType});
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
