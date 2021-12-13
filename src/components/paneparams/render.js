/** Created by xwp on 2021-12-03 **/
import db from "@/utils/db";
import {ICON_ENUM, PG_PANE_PARAMS} from "@/config/froala";


/**
 * 获取窗格参数模板
 */
const getPaneParametersRender = () => {
  const parameters = [...document.querySelectorAll('[data-param-name]')];
  const template = parameters.reduce(async (prev, next) => {
    const htmlId = next.getAttribute('id'), params = await db.getItem(htmlId);

    return await prev + `<li class="panel-param-item" data-html-id="${params?.id}">
        <span class="pane-params-name ${params?.isRequired ? 'required' : ''}">${params?.name}</span>
        <span class="pane-params-icon ${ICON_ENUM[params?.paramType]}"></span>
        <span class="pane-params-close uk-icon" uk-icon="close"></span>
      </li>`
  }, '')

  return {
    template,
    paramCount: parameters.length
  }

}

/**
 * 窗格参数渲染
 * @returns {string}
 */
export default async () => {
  const {template, paramCount} = await getPaneParametersRender();
  const templateRender = await template;

  document.querySelector(PG_PANE_PARAMS).innerHTML = `
    <ul uk-tab uk-sticky>
      <li class="uk-active"><a href="#">参数 <sup class="uk-badge">${paramCount}</sup></a></li>
    </ul>
     <ul class="uk-list pane-params-container">${templateRender}</ul>
  `;
}
