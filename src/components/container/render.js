/** Created by xwp on 2021-11-10 **/
import {$} from "@/utils/Dom";
import createParameters from './parameter-render';
import {PARAMETERS_WRAPPER, FROALA_CONTAINER} from "@/config/froala";

/**
 * 参数库&参数编容器模板
 * @returns {string}
 */
const template = () => {
  const FROALA_CONTAINER_ID = FROALA_CONTAINER.split('#')[1];

  return `
      <div id="pg-toolbar-container" class="pg-toolbar-container"></div>
      <div class="pg-edit-container">
        <nav id="pg-html-panel-params" class="pg-html-panel-params"><button class="uk-button uk-button-primary uk-button-small" id="get-data-btn">获取测试数据</button></nav>
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

export default (opts = {}) => {
  if (!opts?.container) throw Error('请传入容器！');
  opts.container.innerHTML = template();

  // 创建参数库
  $.getElem(PARAMETERS_WRAPPER).innerHTML = createParameters();
}
