/** Created by xwp on 2021-11-17 **/
import db from "@/utils/db";

const template = () => {
  let htmlTpl = '';
  for (let i = 0; i < 18; i++) {
    htmlTpl += `<span class="pg-param-card-item" data-shadow-value="" name="person" contenteditable="false">&nbsp;</span>`
  }
  return htmlTpl
}

export const idcard = async (key) => {
  const data = await db.getItem(key) || {};
  const {id, defaultValue, name} = data;

  return `&nbsp;<span class="fr-deletable id-card-wrapper" contenteditable="false" id="${id}" data-param-name="${name}" data-param-type="idcard">${template()}</span></span>&nbsp;`
}
