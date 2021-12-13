/** Created by xwp on 2021-11-10 **/
import {$} from "@/utils/Dom";
import createParameters from './parameter-render';
import {PARAMETERS_WRAPPER, PG_PANE_PARAMS, FROALA_CONTAINER} from "@/config/froala";

const FROALA_CONTAINER_ID = FROALA_CONTAINER.split('#')[1];
const PG_PANE_PARAMS_ID = PG_PANE_PARAMS.split('#')[1];

/**
 * 参数库&参数编容器模板
 * @returns {string}
 */
const template = () => {
  return `
      <!-- 编辑-模板头部 -->
      <div>
        <div class="pg-header-wrapper">
          <div class="pg-header-left-content">
            <div class="pg-header-return-back">
              <i class="uk-icon uk-text-primary" uk-icon="icon: chevron-left"></i>
              <button class="uk-button uk-button-link uk-text-primary">返回</button>
            </div>
            <div class="uk-width-1-4"><input type="text" class="uk-input uk-form-width-small uk-form-small" value="无标题文档"></div>
            <div class="document-update-time uk-text-muted uk-margin-small-left">保存成功，更新时间2021-12-06 17:05:50</div>
          </div>
          <div class="pg-header-right-content">
            <button class="uk-button uk-button-link uk-text-primary"><i class="uk-icon" uk-icon="icon:download"></i>下载</button>
            <button class="uk-button uk-button-default uk-button-small">预览</button>
            <button class="uk-button uk-button-primary uk-button-small" id="pg-save-editor-content">保存</button>
          </div>
        </div>
        <div id="pg-toolbar-container" class="pg-toolbar-container"></div>
      </div>
      <!-- 参数编辑容器 -->
      <div class="pg-edit-container">
        <nav id="${PG_PANE_PARAMS_ID}" class="pg-html-panel-params"></nav>
        <div id="${FROALA_CONTAINER_ID}" class="pg-froala-container"></div>
        <nav id="pg-parameter-container" class="pg-parameter-container">
          <ul uk-accordion>
              <li>
                  <a class="uk-accordion-title uk-text-left uk-text-small" href="#">参数库</a>
                  <div id="pg-parameters-wrapper" class="uk-accordion-content"></div>
              </li>
              <hr class="uk-column-divider uk-margin-small-top" />
          </ul>
           <ul uk-accordion>
              <li id="pd-param-edit-wrapper">
                  <a class="uk-accordion-title uk-text-left uk-text-small uk-disabled uk-text-muted" href="#">参数编辑</a>
                  <div id="pg-parameter-edit-wrapper" class="uk-accordion-content uk-text-left uk-text-small"></div>
              </li>
              <hr class="uk-column-divider uk-margin-small-top" />
          </ul>
        </nav>
      </div>`;
}


/**
 * 编辑发起模板
 */
const editTemplate = () => {
  return `
      <!-- 发起-模板头部 -->
        <div class="pg-header-wrapper">
        <div class="pg-header-return-back">
          <i class="uk-icon uk-text-primary" uk-icon="icon: chevron-left"></i>
          <button class="uk-button uk-button-link uk-text-primary">返回</button>
        </div>
        <div class="pg-header-wrapper-content">
          <div>补全文件内容</div>
          <div class="document-update-time uk-text-muted uk-margin-small-left">所有编辑将实时保存 | 17:05:50(10分钟前) 自定保存成功</div>
        </div>
        <div class="pg-header-right-content">
            <button class="uk-button uk-button-link uk-text-primary">保存草稿</button>
            <button class="uk-button uk-button-default uk-button-small">指定签署位置</button>
            <button class="uk-button uk-button-primary uk-button-small">发起</button>
         </div>
      </div>
      
      <!-- 参数编辑容器 -->
      <div class="pg-edit-container initiate-container">
        <div id="${FROALA_CONTAINER_ID}" class="pg-froala-container"></div>
        <!--发起-参数填写-->
        <nav class="pg-parameter-fillin-container parameter-fillin">
          <ul uk-tab>
              <li class="uk-active"><a href="#">参数填写<sup class="uk-badge" id="parameter-count-badge">0</sup></a></li>
          </ul>
          <form class="uk-form-stacked">
             <div class="uk-form-controls uk-flex uk-flex-right">
               <label class="uk-margin-small-right"><input class="uk-checkbox" type="checkbox"> 仅看必填</label>
               <label><input class="uk-checkbox" type="checkbox" checked> 仅看待我填写</label>
             </div>
            <!--参数填写容器-->
             <div id="fill-in-parameter-container"></div>
          </form>
        </nav>
      </div>`;
}

export default (opts = {}) => {
  if (!opts?.container) throw Error('请传入容器！');

  const isViewer = opts?.isViewer;
  if (!isViewer) {
    opts.container.innerHTML = template();
    // 创建参数库
    $.getElem(PARAMETERS_WRAPPER).innerHTML = createParameters();
  } else {
    opts.container.innerHTML = editTemplate();
  }
}
