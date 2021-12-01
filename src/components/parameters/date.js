/** Created by xwp on 2021-11-15 **/

import db from "@/utils/db";

export const date = async (key) => {
  const data = await db.getItem(key) || {};
  const {id, defaultValue, style, name} = data;

  return `&nbsp;<span
    contenteditable="false"
    class="fr-deletable pg-param-text pg-param-common"
    type="text"
    id="${id}"
    data-shadow-value="${defaultValue}"
    data-param-type="date"
    data-param-name="${name}"
    data-border-type="${style}"></span>&nbsp;`
}

