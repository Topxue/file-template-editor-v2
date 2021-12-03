/** Created by xwp on 2021-12-03 **/
import render from './render';
import {FROALA_CONTAINER} from "@/config/froala";

export default {
  async _init() {
    await render()
    await this.initEvent()
  },

  initEvent() {
    // 选择窗格事件
    const panelParams = document.querySelectorAll('li[data-html-id]');
    panelParams.forEach(element => element.addEventListener('click', this.currentPaneParamActive.bind(this), false));
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
  },

  /**
   * 选中当前窗格参数样式修改
   * @param target
   */
  activeCurrentPaneParamStyle(target) {
    const siblings = Array.from(target.parentNode.children).filter(n => n !== target);
    target.classList.add('is-active');
    siblings.forEach(element => element.classList.remove('is-active'));
  }

}
