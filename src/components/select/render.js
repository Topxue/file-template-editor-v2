/** Created by xwp on 2021-11-16 **/
import {$} from "@/utils/Dom";

const template = (opts) => {
  const options = opts.options

  return `
      <div uk-dropdown="mode:click;pos: bottom-justify" id="select-drop">
        <ul class="uk-nav uk-dropdown-nav pg-dropdown-container pg-select-dropdown-list" id="pg-select-dropdown-list">
          ${options.reduce((prev, next) => prev + `<li class="uk-dropdown-close" data-value="${next.value}">${next.value}</li>`, '')}
        </ul>
      </div>
  `
}

export default (opts = {}) => {
  const target = document.querySelector(opts.elem);
  const parentNode = target.parentNode;
  parentNode.appendChild($.create(template(opts)));

  // const selectWrapper = $.getElem('#select-drop');
  //
  // if (!selectWrapper) {
  //   document.body.append($.create(template(opts)))
  // } else {
  //   const div = document.createElement('div')
  //   div.innerHTML = template(opts)
  //
  //   selectWrapper.innerHTML = div.firstElementChild.innerHTML
  // }

}
