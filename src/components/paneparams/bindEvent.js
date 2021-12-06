/** Created by xwp on 2021-12-03 **/
import db from "@/utils/db";
import render from './render';
import {FROALA_CONTAINER} from "@/config/froala";

export default {
  async _init() {
    await render();
    await this.initEvent();
  },

  initEvent() {
    // 选择窗格事件
    const panelParams = document.querySelectorAll('li[data-html-id]');
    panelParams.forEach(element => element.addEventListener('click', this.currentPaneParamActive.bind(this), false));
    // 删除事件
    const closedWrapper = document.querySelectorAll('.pane-params-close');
    closedWrapper.forEach(element => element.addEventListener('click', this.deletePanelParams.bind(this), false));
  },

  /**
   * 当前窗格活动参数-Active
   */
  currentPaneParamActive(event) {
    const target = event.currentTarget;
    this.activeCurrentPaneParamStyle(target);

    const htmlId = target.getAttribute('data-html-id');
    const froalaContainer = document.querySelector(FROALA_CONTAINER),
      parameter = froalaContainer.querySelector(`#${htmlId}`);

    parameter.click();

    parameter.scrollIntoView({behavior: "smooth", block: "center", inline: "center"});
  },

  /**
   * 选中当前窗格参数样式修改
   * @param target
   */
  activeCurrentPaneParamStyle(target) {
    const siblings = Array.from(target.parentNode.children).filter(n => n !== target);
    target.classList.add('is-active');
    siblings.forEach(element => element.classList.remove('is-active'));
  },

  /**
   * 删除窗格参数
   * @param event
   */
  deletePanelParams(event) {
    event.stopPropagation();

    const froalaContainer = document.querySelector(FROALA_CONTAINER);
    const target = event.currentTarget, targetParent = target.closest('li');
    const htmlId = targetParent.getAttribute('data-html-id');

    const removeParameter = froalaContainer.querySelector(`[data-param-type][id=${htmlId}]`);

    targetParent.remove();
    removeParameter.remove();
    // db?.removeItem(htmlId);
  }
}
