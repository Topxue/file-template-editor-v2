/** Created by xwp on 2021-12-03 **/
import {colorHex} from "@/utils";
import {alignmentList, createTableColumnKeyRender, fontFamilyOptions, fontSizeOptions} from "@/template/render";

export const table = ({params}) => {
  // 参数名称
  const paramName = params.name || '';
  // 字体颜色
  const fontColor = colorHex(params.fontConfig.color) || '#181616';
  // 填写说明
  const description = params.description;
  // 是否隐藏表头
  const isHideThead = params.hideThead;

  return `
      <!--参数名称-->
      <div class="uk-margin">
        <label class="uk-form-label">参数名称</label>
        <div class="uk-form-controls uk-margin-small-top">
          <input class="uk-input uk-form-small uk-text-emphasis accord-attr-input" type="text" name="name" value="${paramName}" placeholder="请输入参数名称">
        </div>
      </div>
      <!--默认值-->
      <div class="uk-margin">
        <label class="uk-form-label">默认值</label>
        <div class="uk-form-controls uk-margin-small-top">
          <div class="uk-text-muted">请直接在表格中编辑表头及初始值</div>
        </div>
      </div>
      <!--字体-->
      <div class="uk-margin">
        <label class="uk-form-label">字体</label>
        <div class="uk-form-controls uk-margin-small-top">
           <select class="uk-select uk-form-small uk-text-emphasis accord-style-input" name="fontFamily">
             <option value="none">请选择</option>
             ${fontFamilyOptions(params)}
            </select>
        </div>
      </div>
      <!--字体大小-->
      <div class="uk-margin">
        <label class="uk-form-label">字体大小</label>
        <div class="uk-form-controls uk-margin-small-top">
           <select class="uk-select uk-form-small uk-text-emphasis accord-style-input" name="fontSize">
             <option value="none">请选择</option>
             ${fontSizeOptions(params)}
           </select>
        </div>
      </div>
       <!--对齐方式-->
      <div class="uk-margin">
        <label class="uk-form-label">对齐方式</label>
         <div class="uk-form-controls uk-margin-small-top">
          <ul class="uk-subnav uk-subnav-pill" uk-switcher>
            ${alignmentList(params)}
          </ul>
        </div>
      </div>
      <!--字体颜色-->
      <div class="uk-margin">
        <label class="uk-form-label">字体颜色</label>
         <div class="uk-form-controls uk-margin-small-top uk-width-1-3">
          <input class="uk-input accord-style-input" type="color" name="color" value="${fontColor}"/>
        </div>
      </div>
      <!--填写说明-->
      <div class="uk-margin">
        <label class="uk-form-label">填写说明</label>
         <div class="uk-form-controls uk-margin-small-top">
         <textarea class="uk-textarea uk-text-emphasis accord-attr-input" name="description" placeholder="对该参数的其他说明(限100字)">${description}</textarea>
        </div>
      </div> 
      <!--隐藏表头-->
      <div class="uk-margin">
         <div class="uk-form-controls uk-margin-small-top">
          <label><input class="uk-checkbox accord-attr-input" type="checkbox" class="uk-checkbox" name="hideThead" ${isHideThead ? 'checked' : ''}> 隐藏表头</label>
        </div>
      </div>
      ${createTableColumnKeyRender(params)}
  `
}
