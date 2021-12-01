/** Created by xwp on 2021-11-16 **/
/**
 * @description selects 多选
 * @author PG
 * @createTime  2021-11-15
 */

import db from '@/utils/db';

const selects = async (key) => {
  const params = await db.getItem(key) || {};
  const {id, style, name, layout} = params;

  return `&nbsp;<span
    contenteditable="false"
    class="fr-deletable pg-param-text pg-param-common"
    type="text"
    id="${id}"
    data-layout="${layout}"
    data-param-type="checkbox"
    data-param-name="${name}"
    data-border-type="${style}"></span>&nbsp;`
}

export {
  selects as checkbox
}
