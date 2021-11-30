/** Created by xwp on 2021-11-17 **/
import {
  alignmentList,
  fontSizeOptions,
  borderExteriors,
  fontFamilyOptions,
  fontWeightOptions,
  controlSizeOptions,
} from '@/template/render';
import {colorHex} from '@/utils';

/**
 * 普通文本参数编辑模板
 * @param config
 * @returns {string}
 */
export default ({params} = {}) => {
  console.log(params, 'params...')
  // 参数名称
  const paramName = params.name || '';
  // 默认值
  const showValue = params.defaultValue || '';
  // 控件大小
  const controlWidth = params.fontConfig.size[1].width || '148';
  const controlHeight = params.fontConfig.size[1].height || '17';
  // 控件大小-显示状态
  const controlShowState = params.fontConfig.size[0] === 'customize' ? '' : 'hidden';
  // 字符限制
  const maxLength = params.maxLength || 1000;
  // 字体颜色
  const fontColor = colorHex(params.fontConfig.color) || '#181616';
  // 参数说明
  const description = params.description;

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
        <label class="uk-form-label" for="pg-parameter-default-value">默认值</label>
        <div class="uk-form-controls uk-margin-small-top">
          <input class="uk-input uk-form-small uk-text-emphasis accord-attr-input" id="pg-parameter-default-value" type="text" value="${showValue}" name="defaultValue" placeholder="请输入默认值" required>
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
                <label class="uk-form-label uk-margin-small-right" for="pg-param-width">宽</label>
                <div class="uk-form-controls uk-margin-small-right">
                  <input class="uk-input uk-form-small uk-text-emphasis accord-style-input" id="pg-param-width" min="148" value="${controlWidth}" name="width" type="number" placeholder="请输入">
                </div>
              </div>
              <div class="uk-width-1-2 uk-flex uk-flex-align-items">
                <label class="uk-form-label uk-margin-small-right" for="pg-param-height">高</label>
                <div class="uk-form-controls">
                  <input class="uk-input uk-form-small uk-text-emphasis accord-style-input" id="pg-param-height" min="17" value="${controlHeight}" name="height"  type="number" placeholder="请输入">
                </div>
              </div>
          </div>
        </div>
      </div>
      <!--字符限制-->
      <div class="uk-margin">
        <label class="uk-form-label" for="pg-parameter-default-value">字符限制</label>
        <div class="uk-form-controls uk-margin-small-top">
          <input class="uk-input uk-form-small uk-text-emphasis accord-attr-input" id="pg-parameter-default-value" type="number" name="maxLength" min="0" max="1000" value="${maxLength}" placeholder="请输入字符限制">
        </div>
      </div>
      <!--字体-->
      <div class="uk-margin">
        <label class="uk-form-label" for="pg-param-font">字体</label>
        <div class="uk-form-controls uk-margin-small-top">
           <select class="uk-select uk-form-small uk-text-emphasis accord-style-input" id="pg-param-font" name="fontFamily">
             <option value="none">请选择</option>
             ${fontFamilyOptions(params)}
            </select>
        </div>
      </div>
      <!--字体大小-->
      <div class="uk-margin">
        <label class="uk-form-label" for="pg-param-fontsize">字体大小</label>
        <div class="uk-form-controls uk-margin-small-top">
           <select class="uk-select uk-form-small uk-text-emphasis accord-style-input" id="pg-param-fontsize" name="fontSize">
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
        <label class="uk-form-label" for="pg-param-font">字体颜色</label>
         <div class="uk-form-controls uk-margin-small-top uk-width-1-3">
          <input class="uk-input accord-style-input" type="color" name="color" value="${fontColor}" colorformat="hexa"/>
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
          <label><input type="checkbox" class="uk-checkbox" name="isRequired" checked> 必填</label>
        </div>
      </div>
`;
}