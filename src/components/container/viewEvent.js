/** Created by xwp on 2021-11-26 **/
import {$} from "@/utils/Dom";
import {FROALA_CONTAINER} from "@/config/froala";

/**
 * 编辑器视图事件
 */
export default {
  /**
   * 当前活动参数-active
   * @param target
   */
  activeParamSynced(target) {
    const isCard = target?.getAttribute('name') === 'person';
    if (isCard) {
      target = target.parentNode;
    }
    const froalaContainer = document.querySelector(FROALA_CONTAINER);
    const parameters = froalaContainer.querySelectorAll('[data-param-type]');

    const siblings = Array.from(parameters).filter(n => n !== target).filter(element => {
      if (element.getAttribute('data-param-type')) {
        return element;
      }
    });

    if (target?.getAttribute('data-param-type')) {
      target.classList.add('is-active');
    }

    if (siblings?.length) {
      siblings.forEach(element => element.classList.remove('is-active'));
    }

    this.paneParamsLinkageParams(target);
  },

  /**
   * 联动选择-联动与参数库-参数
   */
  paneParamsLinkageParams(target) {
    const htmlId = target?.getAttribute('id');
    if (htmlId) {
      const paneActive = document.querySelector(`li[data-html-id="${htmlId}"]`);
      paneActive.classList.add('is-active');

      const siblings = Array.from(paneActive.parentNode.children).filter(n => n !== paneActive);
      siblings.forEach(element => element.classList.remove('is-active'));
    } else {
      const paneParams = document.querySelectorAll(`li[data-html-id]`);
      paneParams.forEach(element => element.classList.remove('is-active'));
    }
  },

  /**
   * 控制参数编辑展开
   * @param state
   */
  controlAccordion(state) {
    const accordionWrapper = $.getElem('#pd-param-edit-wrapper');

    if (state) {
      $.class.add(accordionWrapper, 'uk-open');
      accordionWrapper.children[0].classList.remove('uk-disabled', 'uk-text-muted');
      $.getElem('#pg-parameter-edit-wrapper').removeAttribute('hidden');
    } else {
      $.class.remove(accordionWrapper, 'uk-open');
      accordionWrapper.children[0].classList.add('uk-disabled', 'uk-text-muted');
      $.getElem('#pg-parameter-edit-wrapper').setAttribute('hidden', true);
    }

    $.attr(accordionWrapper.children[0], 'aria-expanded', state);
  },

  /**
   * 设置控件大小
   * @param target
   * @param froala
   * @param type
   */
  setControlSize(target, $, type) {
    const styledEum = {
      'auto': {
        "display": 'inline',
      },
      'fixed': {
        "display": 'inline-flex',
        "width": '148px',
        "min-width": '148px',
        "min-height": '17px'
      },
      'customize': {
        "display": 'inline-flex',
      }
    }

    $(target).css(styledEum[type]);
  },
}
