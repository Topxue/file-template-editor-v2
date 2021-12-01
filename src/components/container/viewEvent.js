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
    const isCard = target.getAttribute('name') === 'person';
    if (isCard) {
      target = target.parentNode;
    }

    const isParameter = $.attr(target, 'data-param-type');
    const froalaContainer = document.querySelector(FROALA_CONTAINER);
    const parameters = froalaContainer.querySelectorAll('[data-param-type]');

    if (isParameter) {
      const id = $.attr(target, 'id');
      parameters.forEach(element => {
        if ($.attr(element, 'id') === id) {
          $.class.add(element, 'is-active')
        } else {
          $.class.remove(element, 'is-active')
        }
      })
    } else {
      parameters.forEach(element => $.class.remove(element, 'is-active'));
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
