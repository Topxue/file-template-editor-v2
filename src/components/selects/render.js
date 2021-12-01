/** Created by xwp on 2021-11-16 **/
import {$} from "@/utils/Dom";

const template = (opts) => {
  const options = opts.options

  const NoData = '<div class="no-data-content">暂无数据</div>'

  return `<div id="select-drop-multiple" class="pg-select-dropdown">
   ${options?.length ? `<ul id="pg-select-dropdown-list-multiple" class="pg-select-dropdown-list">
    ${
    options.reduce((prve, item) => {
      return prve + `<li class="select-item-multiple" data-value="${item.value}">${item.label}</li>`
    }, '')
  }
    </ul>` : NoData}
</div>`
}

export default (opts = {}) => {
  const selectWrapper = $.getElem('#select-drop-multiple')

  if (!selectWrapper) {
    document.body.append($.create(template(opts)))
  } else {
    const div = document.createElement('div')
    div.innerHTML = template(opts)

    selectWrapper.innerHTML = div.firstElementChild.innerHTML
  }

}
