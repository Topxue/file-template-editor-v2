/** Created by xwp on 2021-11-30 **/
import {
  alignmentList,
  borderExteriors,
  fontSizeOptions,
  fontFamilyOptions,
  fontWeightOptions,
  controlSizeOptions, dateFormatOptionsRender,
} from "@/template/render";
import {colorHex} from "@/utils";
import {PG_SELECT_DATE_ID} from "@/config/froala";

export const date = ({params}) => {
  // 参数名称
  const paramName = params.name || '';
  // 默认值
  const showValue = params.defaultValue || '';
  // 控件大小
  const controlWidth = params.fontConfig.size[1].width || '148';
  const controlHeight = params.fontConfig.size[1].height || '17';
  // 控件大小-显示状态
  const controlShowState = params.fontConfig.size[0] === 'customize' ? '' : 'hidden';
  // 字体颜色
  const fontColor = colorHex(params.fontConfig.color) || '#181616';
  // 参数说明
  const description = params.description;
  const PG_SELECT_DATE = PG_SELECT_DATE_ID.split('#')[1];
  // 是否必填
  const isRequired = params.isRequired;

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
        <div class="uk-form-controls uk-margin-small-top" id="pg-default-wrapper">
          <input class="uk-input uk-form-small uk-text-emphasis accord-attr-input" readonly id="${PG_SELECT_DATE}" value="${showValue}" name="defaultValue" placeholder="请输入默认值" required>
        </div>
      </div>
       <!--日期格式-->
      <div class="uk-margin">
        <label class="uk-form-label">日期格式</label>
        <div class="uk-form-controls uk-margin-small-top">
         <select class="uk-select uk-form-small uk-text-emphasis" id="pg-change-date-format" name="format">
           ${dateFormatOptionsRender(params)}
          </select>
        </div>
      </div>
       <!--外观-->
      <div class="uk-margin">
        <label class="uk-form-label">外观</label>
        <div class="uk-form-controls uk-margin-small-top">
          ${borderExteriors(params)}
        </div>
      </div>
      <!--控件大小-->
       <div class="uk-margin">
        <label class="uk-form-label">控件大小</label>
        <div class="uk-form-controls uk-margin-small-top">
            ${controlSizeOptions(params)}
            <div class="uk-margin-small uk-flex uk-flex-between" id="toggle-usage" ${controlShowState}>
              <div class="uk-width-1-2 uk-flex uk-flex-align-items">
                <label class="uk-form-label uk-margin-small-right">宽</label>
                <div class="uk-form-controls uk-margin-small-right">
                  <input class="uk-input uk-form-small uk-text-emphasis accord-style-input" min="148" value="${controlWidth}" name="width" type="number" placeholder="请输入">
                </div>
              </div>
              <div class="uk-width-1-2 uk-flex uk-flex-align-items">
                <label class="uk-form-label uk-margin-small-right">高</label>
                <div class="uk-form-controls">
                  <input class="uk-input uk-form-small uk-text-emphasis accord-style-input" min="17" value="${controlHeight}" name="height"  type="number" placeholder="请输入">
                </div>
              </div>
          </div>
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
      <!--字体粗细-->
       <div class="uk-margin">
        <label class="uk-form-label">字体粗细</label>
        <div class="uk-form-controls uk-margin-small-top">
           <select class="uk-select uk-form-small uk-text-emphasis accord-style-input" name="fontWeight">
            ${fontWeightOptions(params)}
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
      <!--是否必填-->
      <div class="uk-margin">
         <div class="uk-form-controls uk-margin-small-top">
          <label><input class="uk-checkbox accord-attr-input" type="checkbox" name="isRequired"  ${isRequired ? 'checked' : ''}> 必填</label>
        </div>
      </div>
  `
}
