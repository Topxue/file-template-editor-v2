/** Created by xwp on 2021-11-11 **/

import {PARAMETERS} from '@/config/froala'

/**
 * 创建参数库
 * @returns {string}
 */
export default () => {
  return `
    <div class="parameter-container" id="parameter-container">
     ${PARAMETERS.reduce((prev, next) => {
    return prev + `
            <div class="param-item" data-param-type="${next.type}">
              <i class="fa ${next.icon}"></i>
              <span>${next.label}</span>
            </div>
          `
  }, '')}
    </div>`;
}
