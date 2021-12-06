/** Created by xwp on 2021-11-10 **/
import {$} from "@/utils/Dom";
import createParameters from './parameter-render';
import {PARAMETERS_WRAPPER, PG_PANE_PARAMS, FROALA_CONTAINER} from "@/config/froala";

/**
 * 参数库&参数编容器模板
 * @returns {string}
 */
const template = (opts) => {
  const isViewer = opts.isViewer;

  const FROALA_CONTAINER_ID = FROALA_CONTAINER.split('#')[1];
  const PG_PANE_PARAMS_ID = PG_PANE_PARAMS.split('#')[1];

  return `
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
            <button class="uk-button uk-button-primary uk-button-small">保存</button>
          </div>
        </div>
        <div id="pg-toolbar-container" class="pg-toolbar-container"></div>
      </div>
      
      <div class="pg-edit-container">
        <nav id="${PG_PANE_PARAMS_ID}" class="pg-html-panel-params" style="visibility: ${isViewer ? 'hidden' : 'none'}"></nav>
        <div id="${FROALA_CONTAINER_ID}" class="pg-froala-container"></div>
        <nav id="pg-parameter-container" class="pg-parameter-container" style="visibility: ${isViewer ? 'hidden' : 'none'}">
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

export default (opts = {}) => {
  if (!opts?.container) throw Error('请传入容器！');
  opts.container.innerHTML = template(opts);
  // 创建参数库
  $.getElem(PARAMETERS_WRAPPER).innerHTML = createParameters();
}
